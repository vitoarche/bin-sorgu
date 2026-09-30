// Çeviriler ve dil seçimi: DOM'suz, hem tarayıcıda hem Node'da çalışır.
// Eksik anahtar İngilizceye düşer. Hiçbir şey saklanmaz (localStorage/çerez yok).
export const SUPPORTED = ['tr', 'en', 'de', 'fr', 'ar', 'zh', 'ko'];
export const FALLBACK = 'en';
export const LANG_NAMES = { tr: 'Türkçe', en: 'English', de: 'Deutsch', fr: 'Français', ar: 'العربية', zh: '中文', ko: '한국어' };
// <html lang> ve Intl.DisplayNames için BCP 47 etiketi.
export const LANG_TAGS = { tr: 'tr', en: 'en', de: 'de', fr: 'fr', ar: 'ar', zh: 'zh-Hans', ko: 'ko' };

const en = {
  title: 'BIN Lookup – the first 6-8 digits of a card',
  metaDesc: 'Find the country, bank, card type and brand from the first 6-8 digits (BIN) of a card. Static site without a server-side app; the digits you enter are not stored.',
  h1: 'BIN Lookup',
  lead: 'Find the country, bank, type and brand from the first 6-8 digits of a card.',
  warnStrong: 'Do not enter a full card number, expiry date or CVV.',
  warnRest: 'Only the first 6-8 digits are needed.',
  label: 'First 6-8 digits of the card',
  placeholder: 'e.g. 411111',
  hint: 'Digits only; at most 8.',
  truncated: 'Only the first 6-8 digits are needed. Extra digits were removed.',
  langLabel: 'Language',
  resultLabel: 'Lookup result',
  searching: 'Searching…',
  notFound: 'No record was found for this BIN.',
  loadError: 'Could not load the data. Check your connection and try again.',
  unknown: 'Unknown',
  rowBank: 'Bank',
  rowType: 'Type',
  rowBrand: 'Brand',
  rowCategory: 'Category',
  rowBin: 'Matched BIN',
  typeCredit: 'Credit card',
  typeDebit: 'Debit card',
  typeCharge: 'Charge card',
  typePrepaidSuffix: 'prepaid',
  typePrepaid: 'Prepaid card',
  footerData: 'Data:',
  footerDisclaimer: 'Not an official IIN registry; errors are possible.',
  privacy: 'The digits you enter are not stored and not sent to any third party. Only the first 3 digits go to the server that hosts this site, to fetch the data file.',
};

const tr = {
  title: 'BIN Sorgu – kartın ilk 6-8 hanesi',
  metaDesc: 'Kartın ilk 6-8 hanesinden (BIN) ülke, banka, kart türü ve markayı öğrenin. Sunucusuz statik site; girdiğiniz rakamlar kaydedilmez.',
  h1: 'BIN Sorgu',
  lead: 'Kartın ilk 6-8 hanesinden ülke, banka, tür ve markayı öğrenin.',
  warnStrong: 'Tam kart numarası, son kullanma tarihi veya CVV girmeyin.',
  warnRest: 'Yalnızca ilk 6-8 hane gerekir.',
  label: 'Kartın ilk 6-8 hanesi',
  placeholder: 'örn. 411111',
  hint: 'Yalnızca rakam; en fazla 8 hane.',
  truncated: 'Yalnızca ilk 6-8 hane gerekir. Fazla haneler silindi.',
  langLabel: 'Dil',
  resultLabel: 'Sorgu sonucu',
  searching: 'Aranıyor…',
  notFound: 'Bu BIN için kayıt bulunamadı.',
  loadError: 'Veri yüklenemedi. Bağlantınızı kontrol edip tekrar deneyin.',
  unknown: 'Bilinmiyor',
  rowBank: 'Banka',
  rowType: 'Tür',
  rowBrand: 'Marka',
  rowCategory: 'Kategori',
  rowBin: 'Eşleşen BIN',
  typeCredit: 'Kredi kartı',
  typeDebit: 'Banka kartı',
  typeCharge: 'Charge kart',
  typePrepaidSuffix: 'ön ödemeli',
  typePrepaid: 'Ön ödemeli kart',
  footerData: 'Veri:',
  footerDisclaimer: 'Resmi IIN kaydı değildir, hata olabilir.',
  privacy: 'Girdiğiniz rakamlar kaydedilmez ve üçüncü tarafa gönderilmez. Yalnızca ilk 3 hane, veri dosyasını almak için bu siteyi sunan sunucuya gider.',
};

const de = {
  title: 'BIN-Abfrage – die ersten 6-8 Ziffern einer Karte',
  metaDesc: 'Finden Sie Land, Bank, Kartentyp und Marke anhand der ersten 6-8 Ziffern (BIN) einer Karte. Statische Website ohne Server-Anwendung; eingegebene Ziffern werden nicht gespeichert.',
  h1: 'BIN-Abfrage',
  lead: 'Finden Sie Land, Bank, Typ und Marke anhand der ersten 6-8 Ziffern einer Karte.',
  warnStrong: 'Geben Sie keine vollständige Kartennummer, kein Ablaufdatum und keinen CVV ein.',
  warnRest: 'Es werden nur die ersten 6-8 Ziffern benötigt.',
  label: 'Erste 6-8 Ziffern der Karte',
  placeholder: 'z. B. 411111',
  hint: 'Nur Ziffern; höchstens 8.',
  truncated: 'Es werden nur die ersten 6-8 Ziffern benötigt. Überzählige Ziffern wurden entfernt.',
  langLabel: 'Sprache',
  resultLabel: 'Abfrageergebnis',
  searching: 'Suche läuft…',
  notFound: 'Für diese BIN wurde kein Eintrag gefunden.',
  loadError: 'Die Daten konnten nicht geladen werden. Prüfen Sie Ihre Verbindung und versuchen Sie es erneut.',
  unknown: 'Unbekannt',
  rowBank: 'Bank',
  rowType: 'Typ',
  rowBrand: 'Marke',
  rowCategory: 'Kategorie',
  rowBin: 'Gefundene BIN',
  typeCredit: 'Kreditkarte',
  typeDebit: 'Debitkarte',
  typeCharge: 'Charge-Karte',
  typePrepaidSuffix: 'Prepaid',
  typePrepaid: 'Prepaid-Karte',
  footerData: 'Daten:',
  footerDisclaimer: 'Kein offizielles IIN-Register; Fehler sind möglich.',
  privacy: 'Die eingegebenen Ziffern werden nicht gespeichert und nicht an Dritte gesendet. Nur die ersten 3 Ziffern gehen an den Server, der diese Website ausliefert, um die Datendatei abzurufen.',
};

const fr = {
  title: 'Recherche BIN – les 6 à 8 premiers chiffres d’une carte',
  metaDesc: 'Trouvez le pays, la banque, le type de carte et la marque à partir des 6 à 8 premiers chiffres (BIN) d’une carte. Site statique sans application serveur ; les chiffres saisis ne sont pas enregistrés.',
  h1: 'Recherche BIN',
  lead: 'Trouvez le pays, la banque, le type et la marque à partir des 6 à 8 premiers chiffres d’une carte.',
  warnStrong: 'Ne saisissez pas le numéro complet de la carte, la date d’expiration ni le CVV.',
  warnRest: 'Seuls les 6 à 8 premiers chiffres sont nécessaires.',
  label: '6 à 8 premiers chiffres de la carte',
  placeholder: 'p. ex. 411111',
  hint: 'Chiffres uniquement ; 8 au maximum.',
  truncated: 'Seuls les 6 à 8 premiers chiffres sont nécessaires. Les chiffres en trop ont été supprimés.',
  langLabel: 'Langue',
  resultLabel: 'Résultat de la recherche',
  searching: 'Recherche en cours…',
  notFound: 'Aucun enregistrement trouvé pour ce BIN.',
  loadError: 'Impossible de charger les données. Vérifiez votre connexion et réessayez.',
  unknown: 'Inconnu',
  rowBank: 'Banque',
  rowType: 'Type',
  rowBrand: 'Marque',
  rowCategory: 'Catégorie',
  rowBin: 'BIN correspondant',
  typeCredit: 'Carte de crédit',
  typeDebit: 'Carte de débit',
  typeCharge: 'Carte de paiement différé (charge card)',
  typePrepaidSuffix: 'prépayée',
  typePrepaid: 'Carte prépayée',
  footerData: 'Données :',
  footerDisclaimer: 'Ce n’est pas un registre IIN officiel ; des erreurs sont possibles.',
  privacy: 'Les chiffres saisis ne sont pas enregistrés et ne sont envoyés à aucun tiers. Seuls les 3 premiers chiffres sont transmis au serveur qui héberge ce site, afin de récupérer le fichier de données.',
};

const ar = {
  title: 'استعلام BIN – أول 6 إلى 8 أرقام من البطاقة',
  metaDesc: 'اعرف البلد والبنك ونوع البطاقة والعلامة التجارية من أول 6 إلى 8 أرقام (BIN) من البطاقة. موقع ثابت بلا تطبيق خادم؛ الأرقام التي تدخلها لا تُحفظ.',
  h1: 'استعلام BIN',
  lead: 'اعرف البلد والبنك والنوع والعلامة التجارية من أول 6 إلى 8 أرقام من البطاقة.',
  warnStrong: 'لا تُدخل رقم البطاقة الكامل ولا تاريخ الانتهاء ولا رمز CVV.',
  warnRest: 'يلزم فقط أول 6 إلى 8 أرقام.',
  label: 'أول 6 إلى 8 أرقام من البطاقة',
  placeholder: 'مثال: 411111',
  hint: 'أرقام فقط؛ بحد أقصى 8.',
  truncated: 'يلزم فقط أول 6 إلى 8 أرقام. تم حذف الأرقام الزائدة.',
  langLabel: 'اللغة',
  resultLabel: 'نتيجة الاستعلام',
  searching: 'جارٍ البحث…',
  notFound: 'لم يتم العثور على سجل لهذا الـ BIN.',
  loadError: 'تعذّر تحميل البيانات. تحقق من اتصالك ثم حاول مرة أخرى.',
  unknown: 'غير معروف',
  rowBank: 'البنك',
  rowType: 'النوع',
  rowBrand: 'العلامة التجارية',
  rowCategory: 'الفئة',
  rowBin: 'الـ BIN المطابق',
  typeCredit: 'بطاقة ائتمان',
  typeDebit: 'بطاقة خصم',
  typeCharge: 'بطاقة الدفع الآجل (Charge)',
  typePrepaidSuffix: 'مسبقة الدفع',
  typePrepaid: 'بطاقة مسبقة الدفع',
  footerData: 'البيانات:',
  footerDisclaimer: 'ليس سجلًا رسميًا لـ IIN، وقد توجد أخطاء.',
  privacy: 'الأرقام التي تدخلها لا تُحفظ ولا تُرسل إلى أي طرف ثالث. أول 3 أرقام فقط تصل إلى الخادم الذي يقدّم هذا الموقع، لجلب ملف البيانات.',
};

const zh = {
  title: 'BIN 查询 – 银行卡前 6-8 位',
  metaDesc: '通过银行卡前 6-8 位数字（BIN）查询发卡国家、银行、卡类型和品牌。这是没有服务器端应用的静态网站；您输入的数字不会被保存。',
  h1: 'BIN 查询',
  lead: '通过银行卡前 6-8 位数字查询国家、银行、类型和品牌。',
  warnStrong: '请勿输入完整卡号、有效期或 CVV。',
  warnRest: '只需输入前 6-8 位数字。',
  label: '银行卡前 6-8 位数字',
  placeholder: '例如 411111',
  hint: '仅限数字，最多 8 位。',
  truncated: '只需前 6-8 位数字，多余的数字已被删除。',
  langLabel: '语言',
  resultLabel: '查询结果',
  searching: '正在查询…',
  notFound: '未找到此 BIN 的记录。',
  loadError: '无法加载数据。请检查网络连接后重试。',
  unknown: '未知',
  rowBank: '银行',
  rowType: '类型',
  rowBrand: '品牌',
  rowCategory: '类别',
  rowBin: '匹配的 BIN',
  typeCredit: '信用卡',
  typeDebit: '借记卡',
  typeCharge: '签账卡（Charge card）',
  typePrepaidSuffix: '预付费',
  typePrepaid: '预付费卡',
  footerData: '数据：',
  footerDisclaimer: '并非官方 IIN 注册库，可能存在错误。',
  privacy: '您输入的数字不会被保存，也不会发送给任何第三方。只有前 3 位数字会发送到提供本网站的服务器，用于获取数据文件。',
};

const ko = {
  title: 'BIN 조회 – 카드 앞 6-8자리',
  metaDesc: '카드 앞 6-8자리(BIN)로 국가, 은행, 카드 종류, 브랜드를 확인하세요. 서버 측 앱이 없는 정적 사이트이며, 입력한 숫자는 저장되지 않습니다.',
  h1: 'BIN 조회',
  lead: '카드 앞 6-8자리로 국가, 은행, 종류, 브랜드를 확인하세요.',
  warnStrong: '전체 카드 번호, 유효기간, CVV는 입력하지 마세요.',
  warnRest: '앞 6-8자리만 필요합니다.',
  label: '카드 앞 6-8자리',
  placeholder: '예: 411111',
  hint: '숫자만 입력하세요. 최대 8자리.',
  truncated: '앞 6-8자리만 필요합니다. 초과한 숫자는 삭제되었습니다.',
  langLabel: '언어',
  resultLabel: '조회 결과',
  searching: '검색 중…',
  notFound: '이 BIN에 대한 기록을 찾을 수 없습니다.',
  loadError: '데이터를 불러오지 못했습니다. 연결을 확인하고 다시 시도하세요.',
  unknown: '알 수 없음',
  rowBank: '은행',
  rowType: '종류',
  rowBrand: '브랜드',
  rowCategory: '분류',
  rowBin: '일치한 BIN',
  typeCredit: '신용카드',
  typeDebit: '체크카드',
  typeCharge: '차지카드(Charge card)',
  typePrepaidSuffix: '선불',
  typePrepaid: '선불카드',
  footerData: '데이터:',
  footerDisclaimer: '공식 IIN 등록부가 아니며 오류가 있을 수 있습니다.',
  privacy: '입력한 숫자는 저장되지 않으며 제3자에게 전송되지 않습니다. 데이터 파일을 가져오기 위해 앞 3자리만 이 사이트를 제공하는 서버로 전송됩니다.',
};

export const DICT = { en, tr, de, fr, ar, zh, ko };

export function isSupported(lang) { return SUPPORTED.includes(lang); }

/** Anahtar yoksa İngilizceye düşer; o da yoksa anahtarın kendisi. */
export function t(lang, key) {
  return DICT[lang]?.[key] || DICT[FALLBACK][key] || key;
}

export function dirOf(lang) { return lang === 'ar' ? 'rtl' : 'ltr'; }

function primary(tag) { return String(tag ?? '').toLowerCase().split(/[-_]/)[0]; }

/** ?lang=xx geçerliyse o; değilse tarayıcı dilleri sırasıyla; yoksa İngilizce. zh-* hepsi zh. */
export function detectLang(languages, search) {
  let asked = null;
  try { asked = new URLSearchParams(search || '').get('lang'); } catch { /* yoksay */ }
  if (asked) {
    const p = primary(asked);
    if (isSupported(p)) return p;
  }
  for (const l of languages || []) {
    const p = primary(l);
    if (isSupported(p)) return p;
  }
  return FALLBACK;
}

/** Tür etiketi seçilen dilde; bilinmeyen tür null (satır gizlenir). */
export function typeLabel(lang, type, category) {
  const key = { CREDIT: 'typeCredit', DEBIT: 'typeDebit', 'CHARGE CARD': 'typeCharge' }[(type || '').toUpperCase()];
  const prepaid = /PREPAID/i.test(category || '');
  if (key && prepaid) return `${t(lang, key)} (${t(lang, 'typePrepaidSuffix')})`;
  if (prepaid) return t(lang, 'typePrepaid');
  return key ? t(lang, key) : null;
}
