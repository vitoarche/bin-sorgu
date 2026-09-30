import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeLatest } from '../js/guard.js';

test('yalnızca en yeni sorgu current olur', () => {
  const l = makeLatest();
  const a = l.start();
  assert.equal(a.current(), true);
  const b = l.start();
  assert.equal(a.current(), false);
  assert.equal(b.current(), true);
});

test('yarış: yavaş eski sorgu yeni sonucu ezemez', async () => {
  const l = makeLatest();
  let screen = '';
  const run = async (label, delay) => {
    const t = l.start();
    await new Promise((r) => setTimeout(r, delay));
    if (!t.current()) return;
    screen = label;
  };
  await Promise.all([run('eski', 30), run('yeni', 5)]);
  assert.equal(screen, 'yeni');
});
