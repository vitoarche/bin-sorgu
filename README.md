# BIN Query

<img src="assets/logo.svg" width="72" height="72" alt="BIN Query logosu">

**BIN Query**, kartın ilk 6-8 hanesinden (BIN) ülke, banka, kart türü ve markayı gösteren sunucusuz, statik bir sitedir. Marka adı tüm dillerde aynı kalır. Vanilla HTML/CSS/JS; arayüz 7 dilde (tr, en, de, fr, ar, zh, ko; çeviriler `js/i18n.js`). Dil tarayıcı dilinden seçilir (yedek: İngilizce), `?lang=xx` ile veya sayfadaki seçiciyle değiştirilir; seçim hiçbir yerde saklanmaz.

## Veri doğrulaması (bin-list-data.csv, indirilen dosya 27.607.253 bayt)

- (a) Satır sayısı: 374.788 kayıt (başlık hariç); 374.788 benzersiz BIN.
- (b) BIN sütunu: hepsi tam 6 hane, yalnızca rakam. 8 haneli veya karışık kayıt yok. Uygulama yine de önce 8, sonra 6 hane eşleştirir (veri ileride 8 haneli kayıt içerirse çalışır).
- (c) `Type`: yalnızca `DEBIT` (206.182), `CREDIT` (168.547), `CHARGE CARD` (59); boş değer yok. `Category`: 152.196 satır boş; dolu olanlar BUSINESS, CLASSIC, STANDARD, PERSONAL, PLATINUM, GOLD, PREPAID, PREPAID CLASSIC, ... gibi ürün sınıfları. Ön ödemeli ayrı bir `Type` değeri değil, `Category` içinde `PREPAID*` olarak geçer; arayüz bunu "Banka kartı (ön ödemeli)" gibi gösterir. Kategori boşsa satır gizlenir.

## Kullanım

```
node scripts/build.mjs        # CSV'yi .cache/ altına indirir, data/ altına shard'lar yazar
npm test                      # node --test test/*.test.mjs
python3 -m http.server 8000   # http://localhost:8000
```

Shard'lar BIN'in ilk 3 hanesine göre bölünür (`data/411.json` vb.; 770 dosya + `countries.json`; toplam ~21,3 MiB JSON, diskte ~23 MB, en büyük dosya ~86 KB). Ham CSV `.gitignore` ile dışlanmıştır. Shard'lar, siteyi statik barındırmak için depoda tutulur.

## Gizlilik

Giriş en fazla 8 haneye kırpılır; 9+ hane yapıştırılırsa uyarı gösterilir. localStorage, çerez, analitik veya üçüncü taraf isteği yoktur; yalnızca aynı kaynaktaki `data/*.json` dosyaları çekilir. Not: girdiğiniz rakamlar kaydedilmez ve üçüncü tarafa gönderilmez, ancak ilk 3 hane (`data/XXX.json` isteği) siteyi sunan sunucuya gider ve o sunucunun erişim loguna düşebilir. Eşleştirme tarayıcıda yapılır; 4-8. haneler hiçbir yere gitmez.

## Marka

Logo işareti bir mercek: içinde üç sıra nokta bir küre silüeti çizer, ortadaki 6 vurgulu nokta BIN'in ilk 6 hanesidir; merceğin sapı manyetik şeritli küçük bir karttır. Hepsi elle yazılmış SVG'dir, dış kaynak yoktur.

- `assets/logo.svg`: logo ve SVG favicon (başlıktaki kopya `index.html` içinde satır içidir).
- `assets/apple-touch-icon.png`: 180×180, köşesiz (iOS kendisi yuvarlar).
- `assets/og.png`: 1200×630 sosyal paylaşım görseli.

Yazı tipleri sistem yazı tipleridir. Giriş animasyonu ve hover efekti `prefers-reduced-motion: reduce` altında kapanır.

## Atıf

Veri: [venelinkochev/bin-list-data](https://github.com/venelinkochev/bin-list-data), CC-BY-4.0. Resmi IIN kaydı değildir, hata olabilir.
