// CSV -> data/ shard'ları. Kullanım: node scripts/build.mjs [--file yol.csv]
import { mkdir, rm, writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const URL_CSV = 'https://raw.githubusercontent.com/venelinkochev/bin-list-data/master/bin-list-data.csv';
const CACHE = join(ROOT, '.cache', 'bin-list-data.csv');
const OUT = join(ROOT, 'data');
const SHARD_LEN = 3; // js/match.js ile aynı olmalı

export function parseCsv(text) {
  const rows = []; let row = [], f = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; }
      else f += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(f); f = ''; }
    else if (c === '\n') { row.push(f); rows.push(row); row = []; f = ''; }
    else if (c !== '\r') f += c;
  }
  if (f || row.length) { row.push(f); rows.push(row); }
  return rows;
}

async function main() {
  const i = process.argv.indexOf('--file');
  let path = i > 0 ? process.argv[i + 1] : CACHE;
  if (!existsSync(path)) {
    console.log('İndiriliyor:', URL_CSV);
    const res = await fetch(URL_CSV);
    if (!res.ok) throw new Error('İndirme başarısız: ' + res.status);
    await mkdir(dirname(CACHE), { recursive: true });
    await writeFile(CACHE, Buffer.from(await res.arrayBuffer()));
    path = CACHE;
  }
  const rows = parseCsv(await readFile(path, 'utf8'));
  const head = rows.shift();
  const ix = Object.fromEntries(head.map((h, k) => [h.trim(), k]));
  const shards = new Map(); const countries = {};
  let n = 0;
  for (const r of rows) {
    const bin = (r[ix.BIN] || '').trim();
    if (!/^\d{6,8}$/.test(bin)) continue;
    const iso = (r[ix.isoCode2] || '').trim().toUpperCase();
    if (iso && !countries[iso]) countries[iso] = (r[ix.CountryName] || '').trim();
    const key = bin.slice(0, SHARD_LEN);
    if (!shards.has(key)) shards.set(key, {});
    // [marka, tür, kategori, banka, ülke kodu]
    shards.get(key)[bin] = [r[ix.Brand], r[ix.Type], r[ix.Category], r[ix.Issuer], iso].map((s) => (s || '').trim());
    n++;
  }
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });
  let bytes = 0;
  for (const [k, v] of shards) {
    const s = JSON.stringify(v); bytes += Buffer.byteLength(s);
    await writeFile(join(OUT, k + '.json'), s);
  }
  await writeFile(join(OUT, 'countries.json'), JSON.stringify(countries));
  console.log(`${n} kayıt, ${shards.size} shard, ${(bytes / 1048576).toFixed(2)} MiB, ${Object.keys(countries).length} ülke`);
}
if (process.argv[1] === fileURLToPath(import.meta.url)) main();
