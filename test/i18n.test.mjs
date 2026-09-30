import test from 'node:test';
import assert from 'node:assert/strict';
import { DICT, SUPPORTED, LANG_NAMES, LANG_TAGS, detectLang, dirOf, t, typeLabel } from '../js/i18n.js';

test('7 dil tanımlı', () => {
  assert.deepEqual([...SUPPORTED].sort(), ['ar', 'de', 'en', 'fr', 'ko', 'tr', 'zh']);
  for (const l of SUPPORTED) {
    assert.ok(DICT[l], l);
    assert.ok(LANG_NAMES[l], l);
    assert.ok(LANG_TAGS[l], l);
  }
});
test('her dilde İngilizcedeki tüm anahtarlar var, fazlası yok', () => {
  const keys = Object.keys(DICT.en).sort();
  for (const l of SUPPORTED) assert.deepEqual(Object.keys(DICT[l]).sort(), keys, l);
});
test('boş çeviri yok', () => {
  for (const l of SUPPORTED) for (const [k, v] of Object.entries(DICT[l])) {
    assert.equal(typeof v, 'string', `${l}.${k}`);
    assert.ok(v.trim().length > 0, `${l}.${k}`);
  }
});
test('dil seçimi: tarayıcı dili', () => {
  assert.equal(detectLang(['tr-TR'], ''), 'tr');
  assert.equal(detectLang(['de-AT'], ''), 'de');
  assert.equal(detectLang(['ar-EG'], ''), 'ar');
  assert.equal(detectLang(['ko-KR'], ''), 'ko');
  assert.equal(detectLang(['zh-CN'], ''), 'zh');
  assert.equal(detectLang(['zh-TW'], ''), 'zh');
  assert.equal(detectLang(['ja'], ''), 'en');
  assert.equal(detectLang(['ja', 'fr-CA'], ''), 'fr');
  assert.equal(detectLang([], ''), 'en');
  assert.equal(detectLang(undefined, undefined), 'en');
});
test('?lang= önceliklidir; geçersizse yedek', () => {
  assert.equal(detectLang(['tr-TR'], '?lang=de'), 'de');
  assert.equal(detectLang(['tr-TR'], '?x=1&lang=AR'), 'ar');
  assert.equal(detectLang(['tr-TR'], '?lang=zh-Hans'), 'zh');
  assert.equal(detectLang(['tr-TR'], '?lang=xx'), 'tr');
  assert.equal(detectLang(['ja'], '?lang=xx'), 'en');
  assert.equal(detectLang(['ja'], '?lang='), 'en');
});
test('yön: ar rtl, diğerleri ltr', () => {
  assert.equal(dirOf('ar'), 'rtl');
  for (const l of ['tr', 'en', 'de', 'fr', 'zh', 'ko']) assert.equal(dirOf(l), 'ltr');
});
test('gizlilik cümlesi her dilde 3 rakamını içerir', () => {
  for (const l of SUPPORTED) assert.match(DICT[l].privacy, /3/, l);
});
test('eksik anahtar İngilizceye düşer', () => {
  assert.equal(t('tr', 'nope'), 'nope');
  assert.equal(t('xx', 'h1'), DICT.en.h1);
});
test('typeLabel dile göre', () => {
  assert.equal(typeLabel('tr', 'CREDIT', ''), 'Kredi kartı');
  assert.equal(typeLabel('en', 'DEBIT', 'PREPAID CLASSIC'), 'Debit card (prepaid)');
  assert.equal(typeLabel('de', '', 'PREPAID'), 'Prepaid-Karte');
  assert.equal(typeLabel('fr', '', ''), null);
  assert.equal(typeLabel('ar', 'CHARGE CARD', ''), DICT.ar.typeCharge);
});
