import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { normalize, shardKey, lookup, flagEmoji, typeLabel } from '../js/match.js';

const shard = {
  '411111': ['VISA', 'CREDIT', 'CLASSIC', 'BANK A', 'US'],
  '41111122': ['MASTERCARD', 'DEBIT', 'PREPAID', 'BANK B', 'TR'],
};

test('normalize: rakam dışını atar', () => {
  assert.deepEqual(normalize('4111 1111-ab'), { digits: '41111111', truncated: false });
  assert.deepEqual(normalize(null), { digits: '', truncated: false });
});
test('normalize: 8 haneden fazlasını keser ve işaretler', () => {
  assert.deepEqual(normalize('4111111122223333'), { digits: '41111111', truncated: true });
  assert.equal(normalize('123456789').digits.length, 8);
  assert.equal(normalize('12345678').truncated, false);
});
test('shardKey: 6 haneden azında null', () => {
  assert.equal(shardKey('41111'), null);
  assert.equal(shardKey('411111'), '411');
  assert.equal(shardKey('4111-1111'), '411');
});
test('lookup: 6 hane eşleşir', () => {
  assert.equal(lookup(shard, '411111').brand, 'VISA');
});
test('lookup: 8 hane önceliklidir', () => {
  const r = lookup(shard, '41111122');
  assert.equal(r.bin, '41111122');
  assert.equal(r.issuer, 'BANK B');
});
test('lookup: 8 hane yoksa 6 haneye düşer', () => {
  const r = lookup(shard, '41111199');
  assert.equal(r.bin, '411111');
});
test('lookup: 7 hane 6 haneye bakar', () => {
  assert.equal(lookup(shard, '4111119').bin, '411111');
});
test('lookup: fazla hane kırpılır, 9. hane sonucu etkilemez', () => {
  assert.equal(lookup(shard, '411111229999').bin, '41111122');
});
test('lookup: geçersiz girişler null', () => {
  assert.equal(lookup(shard, '41111'), null);
  assert.equal(lookup(shard, 'abcdef'), null);
  assert.equal(lookup(shard, ''), null);
  assert.equal(lookup(null, '411111'), null);
  assert.equal(lookup(shard, '999999'), null);
  assert.equal(lookup({}, '__proto_'), null);
  assert.equal(lookup(shard, 'constructor'), null);
});
test('flagEmoji', () => {
  assert.equal(flagEmoji('TR'), '🇹🇷');
  assert.equal(flagEmoji(''), '');
  assert.equal(flagEmoji('XYZ'), '');
});
test('typeLabel: bilinmeyen tür gizlenir, ön ödemeli kategoriden', () => {
  assert.equal(typeLabel('CREDIT', ''), 'Kredi kartı');
  assert.equal(typeLabel('DEBIT', 'PREPAID CLASSIC'), 'Banka kartı (ön ödemeli)');
  assert.equal(typeLabel('', ''), null);
  assert.equal(typeLabel('', 'PREPAID'), 'Ön ödemeli kart');
});

test('uçtan uca: gerçek shard (411111)', async () => {
  const digits = '4111111111111111'.slice(0, 8);
  const shard411 = JSON.parse(await readFile(new URL(`../data/${shardKey(digits)}.json`, import.meta.url), 'utf8'));
  const r = lookup(shard411, digits);
  assert.ok(r, '411111 kaydı bulunmalı');
  assert.equal(r.bin, '411111');
  assert.equal(r.brand, 'VISA');
  assert.match(r.iso2, /^[A-Z]{2}$/);
  assert.ok(r.issuer);
});
test('uçtan uca: Türk BIN ve bulunamayan BIN', async () => {
  const s = JSON.parse(await readFile(new URL('../data/123.json', import.meta.url), 'utf8'));
  const r = lookup(s, '123500');
  assert.equal(r.iso2, 'TR');
  assert.equal(lookup(s, '123999999'), null);
});
