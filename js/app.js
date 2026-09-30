import { normalize, shardKey, lookup, flagEmoji, MIN_LEN } from './match.js';
import { makeLatest } from './guard.js';
import { SUPPORTED, LANG_NAMES, LANG_TAGS, t, dirOf, detectLang, typeLabel } from './i18n.js';

const q = document.getElementById('q');
const notice = document.getElementById('notice');
const out = document.getElementById('result');
const cache = new Map(); // yalnızca bellekte; diske yazılmaz
let countryNames = null;
let lang = 'en';
// Ekranın son durumu; dil değişince yeniden çizmek için (yalnızca bellekte).
let state = { kind: 'none' };
let truncated = false;
const latest = makeLatest();       // çizim sırası
const lookups = makeLatest();      // sorgu sırası (dil değişimi sorguyu iptal etmez)

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
async function countryName(iso2, fallbackMap, tag) {
  try {
    const n = new Intl.DisplayNames([tag], { type: 'region' }).of(iso2);
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
// Veri değerleri (banka, marka...) çevrilmez; bdi yönü çevresinden yalıtır.
function val(text) { const d = el('dd'); d.append(el('bdi', null, text)); return d; }

function titleCase(s) {
  return s.toLowerCase().replace(/(^|[\s(\-/])(\p{L})/gu, (_, a, b) => a + b.toUpperCase());
}

async function render(r, token) {
  if (!countryNames) countryNames = await getJson('data/countries.json').catch(() => ({}));
  if (!token.current()) return;
  const card = el('div', 'card');
  const name = r.iso2 ? await countryName(r.iso2, countryNames, LANG_TAGS[lang]) : t(lang, 'unknown');
  if (!token.current()) return;
  const h = el('h2', 'country');
  const flag = el('span', 'flag', flagEmoji(r.iso2));
  flag.setAttribute('aria-hidden', 'true');
  const nm = el('span'); nm.append(el('bdi', null, name));
  h.append(flag, nm);
  card.append(h);
  const dl = el('dl');
  const rows = [
    [t(lang, 'rowBank'), r.issuer && titleCase(r.issuer)],
    [t(lang, 'rowType'), typeLabel(lang, r.type, r.category)],
    [t(lang, 'rowBrand'), r.brand && titleCase(r.brand)],
    [t(lang, 'rowCategory'), r.category && titleCase(r.category)],
    [t(lang, 'rowBin'), r.bin],
  ];
  for (const [k, v] of rows) if (v) dl.append(el('dt', null, k), val(v));
  card.append(dl);
  if (!token.current()) return;
  show(card);
}

const MSG = { searching: 'searching', notfound: 'notFound', error: 'loadError' };
// Mevcut duruma göre sonucu ve uyarıyı seçili dilde çizer.
async function paint() {
  notice.hidden = !truncated;
  notice.textContent = truncated ? t(lang, 'truncated') : '';
  out.setAttribute('aria-label', t(lang, 'resultLabel'));
  const token = latest.start();
  if (state.kind === 'none') show(null);
  else if (state.kind === 'record') await render(state.r, token);
  else show(el('p', 'card empty', t(lang, MSG[state.kind])));
}

function applyLang(next, updateUrl) {
  lang = next;
  const root = document.documentElement;
  root.lang = LANG_TAGS[lang];
  root.dir = dirOf(lang);
  for (const n of document.querySelectorAll('[data-i18n]')) n.textContent = t(lang, n.dataset.i18n);
  for (const n of document.querySelectorAll('[data-i18n-placeholder]')) n.placeholder = t(lang, n.dataset.i18nPlaceholder);
  document.title = t(lang, 'title');
  document.querySelector('meta[name="description"]').content = t(lang, 'metaDesc');
  document.getElementById('f').setAttribute('aria-label', t(lang, 'h1'));
  picker.value = lang;
  if (updateUrl) {
    try {
      const u = new URL(location.href);
      u.searchParams.set('lang', lang);
      history.replaceState(null, '', u);
    } catch { /* yoksay */ }
  }
  return paint();
}

async function update() {
  const norm = normalize(q.value);
  const { digits } = norm;
  truncated = norm.truncated;
  if (q.value !== digits) q.value = digits;
  const mine = lookups.start();
  if (digits.length < MIN_LEN) { state = { kind: 'none' }; return paint(); }
  state = { kind: 'searching' };
  await paint();
  try {
    const shard = await loadShard(shardKey(digits));
    if (!mine.current()) return;
    const r = lookup(shard, digits);
    state = r ? { kind: 'record', r } : { kind: 'notfound' };
  } catch {
    if (!mine.current()) return;
    state = { kind: 'error' };
  }
  await paint();
}

const picker = document.getElementById('lang');
for (const code of SUPPORTED) {
  const o = el('option', null, LANG_NAMES[code]);
  o.value = code;
  o.lang = LANG_TAGS[code];
  picker.append(o);
}
document.getElementById('langbox').hidden = false;
picker.addEventListener('change', () => applyLang(picker.value, true));
applyLang(detectLang(navigator.languages || [navigator.language], location.search), false);

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
