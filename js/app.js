import { normalize, shardKey, lookup, flagEmoji, typeLabel, MIN_LEN } from './match.js';
import { makeLatest } from './guard.js';

const q = document.getElementById('q');
const notice = document.getElementById('notice');
const out = document.getElementById('result');
const cache = new Map(); // yalnızca bellekte; diske yazılmaz
let countryNames = null;
const latest = makeLatest();

async function getJson(url) {
  const res = await fetch(url, { credentials: 'omit', referrerPolicy: 'no-referrer' });
  if (!res.ok) throw new Error(String(res.status));
  return res.json();
}
function loadShard(key) {
  if (!cache.has(key)) {
    cache.set(key, getJson(`data/${key}.json`).catch((e) => {
      cache.delete(key);
      if (e.message === '404') return {}; // bu öneke ait kayıt yok
      throw e;
    }));
  }
  return cache.get(key);
}
async function countryName(iso2, fallbackMap) {
  try {
    const n = new Intl.DisplayNames(['tr'], { type: 'region' }).of(iso2);
    if (n && n !== iso2) return n;
  } catch { /* eski tarayıcı */ }
  return fallbackMap[iso2] || iso2;
}

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}
function show(node) { out.replaceChildren(...(node ? [node] : [])); }
function message(text) { const c = el('p', 'card empty', text); show(c); }

function titleCase(s) {
  return s.toLowerCase().replace(/(^|[\s(\-/])(\p{L})/gu, (_, a, b) => a + b.toUpperCase());
}

async function render(r, token) {
  if (!countryNames) countryNames = await getJson('data/countries.json').catch(() => ({}));
  if (!token.current()) return;
  const card = el('div', 'card');
  const name = r.iso2 ? await countryName(r.iso2, countryNames) : 'Bilinmiyor';
  if (!token.current()) return;
  const h = el('h2', 'country');
  const flag = el('span', 'flag', flagEmoji(r.iso2));
  flag.setAttribute('aria-hidden', 'true');
  h.append(flag, el('span', null, name));
  card.append(h);
  const dl = el('dl');
  const rows = [
    ['Banka', r.issuer && titleCase(r.issuer)],
    ['Tür', typeLabel(r.type, r.category)],
    ['Marka', r.brand && titleCase(r.brand)],
    ['Kategori', r.category && titleCase(r.category)],
    ['Eşleşen BIN', r.bin],
  ];
  for (const [k, v] of rows) if (v) dl.append(el('dt', null, k), el('dd', null, v));
  card.append(dl);
  if (!token.current()) return;
  show(card);
}

async function update() {
  const { digits, truncated } = normalize(q.value);
  if (q.value !== digits) q.value = digits;
  notice.hidden = !truncated;
  notice.textContent = truncated ? 'Yalnızca ilk 6-8 hane gerekir. Fazla haneler silindi.' : '';
  const token = latest.start();
  if (digits.length < MIN_LEN) { show(null); return; }
  message('Aranıyor…');
  try {
    const shard = await loadShard(shardKey(digits));
    if (!token.current()) return;
    const r = lookup(shard, digits);
    if (r) await render(r, token);
    else message('Bu BIN için kayıt bulunamadı.');
  } catch {
    if (token.current()) message('Veri yüklenemedi. Bağlantınızı kontrol edip tekrar deneyin.');
  }
}

q.addEventListener('input', update);
q.addEventListener('paste', (e) => {
  // 8 haneden fazlası yapıştırılırsa ilk 8'e kırp, uyarı göster.
  const text = e.clipboardData?.getData('text');
  if (text == null) return;
  e.preventDefault();
  // Seçime/imlece göre birleştir; update() normalize edip 8 haneye kırpar.
  const s = q.selectionStart ?? q.value.length;
  const en = q.selectionEnd ?? s;
  q.value = q.value.slice(0, s) + text + q.value.slice(en);
  update();
});
document.getElementById('f').addEventListener('submit', (e) => e.preventDefault());
