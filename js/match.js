// Eşleştirme mantığı: DOM'suz, hem tarayıcıda hem Node'da çalışır.
export const MAX_LEN = 8;
export const MIN_LEN = 6;
export const SHARD_LEN = 3;

/** Rakam dışını atar; 8 haneden fazlasını keser. */
export function normalize(input) {
  const digits = String(input ?? '').replace(/\D/g, '');
  return { digits: digits.slice(0, MAX_LEN), truncated: digits.length > MAX_LEN };
}

export function shardKey(digits) {
  const d = normalize(digits).digits;
  return d.length >= MIN_LEN ? d.slice(0, SHARD_LEN) : null;
}

/** shard: {bin: [marka, tür, kategori, banka, ülke]}. Önce 8, sonra 6 hane. */
export function lookup(shard, digits) {
  const d = normalize(digits).digits;
  if (d.length < MIN_LEN || !shard) return null;
  const has = (k) => Object.prototype.hasOwnProperty.call(shard, k);
  const tries = d.length >= 8 ? [d.slice(0, 8), d.slice(0, 6)] : [d.slice(0, 6)];
  for (const k of tries) {
    if (has(k)) {
      const [brand, type, category, issuer, iso2] = shard[k];
      return { bin: k, brand, type, category, issuer, iso2 };
    }
  }
  return null;
}

export function flagEmoji(iso2) {
  if (!/^[A-Za-z]{2}$/.test(iso2 || '')) return '';
  return [...iso2.toUpperCase()].map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65)).join('');
}

const TYPES = { CREDIT: 'Kredi kartı', DEBIT: 'Banka kartı', 'CHARGE CARD': 'Charge kart' };
/** Tür: veride yoksa null (alan gizlenir). Kategori PREPAID içeriyorsa ön ödemeli eklenir. */
export function typeLabel(type, category) {
  const base = TYPES[(type || '').toUpperCase()] || null;
  const prepaid = /PREPAID/i.test(category || '');
  if (base && prepaid) return base + ' (ön ödemeli)';
  if (prepaid) return 'Ön ödemeli kart';
  return base;
}
