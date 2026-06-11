# PricePlay

Oyun fiyatlarını karşılaştıran, indirimleri keşfetmeni sağlayan bir web uygulaması. CheapShark ve Steam Store API'lerinden canlı veri çeker; mobil tarafta ise yerel snapshot ile çalışır.

**Canlı demo:** [priceplay-lemon.vercel.app](https://priceplay-lemon.vercel.app/#/)

> **Bu proje bir öğrenme / portföy projesidir.** Üniversite sürecinde React, TypeScript, API entegrasyonu ve çoklu platform mimarisi pratiği için geliştirilmiştir. Ticari bir ürün değildir; hata toleransı, ölçeklenebilirlik ve production güvenliği production seviyesinde değildir.

---

## Özellikler

- **Ana sayfa vitrini** — Popüler oyunlar, indirimli fırsatlar, yeni çıkanlar ve ücretsiz oyunlar
- **Oyun arama** — CheapShark üzerinden canlı arama
- **Oyun detayı** — Mağaza bazlı fiyat karşılaştırması, Steam açıklaması, sistem gereksinimleri, örnek fiyat geçmişi grafiği
- **Kategori gezintisi** — Tür, etiket ve vitrin listeleri
- **Favoriler** — Giriş yapan kullanıcı için tarayıcıda saklanan favori listesi
- **Kullanıcı hesabı** — Kayıt, giriş ve profil düzenleme (yerel depolama)
- **Mobil uygulamalar** — Flutter ve React Native (Expo) sürümleri; canlı API yerine `demo-snapshot.json` kullanır

---

## Teknolojiler

| Katman | Stack |
|--------|-------|
| Web arayüz | React 19, TypeScript, Vite, React Router |
| Veri kaynakları | [CheapShark API](https://www.cheapshark.com/api/1.0), Steam Store API |
| Backend (isteğe bağlı) | Node.js, Express, bcryptjs — JSON dosya tabanlı auth |
| Mobil | Flutter (`apps/mobile_flutter`), React Native / Expo (`apps/mobile`) |
| Paylaşılan kod | `packages/shared` |

---

## Proje yapısı

```
priceplay/
├── src/                  # Web uygulaması (React)
├── server/               # Yerel auth API (Express)
├── public/               # Statik dosyalar + demo-snapshot.json
├── scripts/              # Snapshot üretme ve fiyat yenileme betikleri
├── packages/shared/      # Web & mobil ortak tipler
├── apps/
│   ├── mobile_flutter/   # Flutter mobil uygulama
│   └── mobile/           # React Native (Expo) uygulama
└── data/                 # CheapShark önbellek veritabanı
```

---

## Kurulum ve çalıştırma

### Gereksinimler

- Node.js 20.x
- npm

### Web uygulaması

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusu (http://localhost:5173)
npm run dev

# Production build
npm run build
```

Geliştirme modunda Steam API istekleri Vite proxy üzerinden yönlendirilir (`/steam-store` → `store.steampowered.com`), böylece tarayıcı CORS engeline takılmaz.

### Backend (isteğe bağlı)

```bash
cd server
npm install
npm run dev
# http://localhost:8787
```

İlk çalıştırmada kullanıcı veritabanı için şablonu kopyalayın:

```bash
cp server/data/users.json.example server/data/users.json
```

> Web arayüzündeki giriş / kayıt akışı şu an **tarayıcı localStorage** kullanır. `server/` klasörü ayrı bir auth denemesi / gelecek entegrasyon içindir.

### Mobil (Flutter)

```bash
cd apps/mobile_flutter
flutter pub get
flutter run
```

### Mobil (React Native / Expo)

```bash
cd apps/mobile
npm install
npm run start
```

---

## API ve 429 (rate limit) uyarısı

Web uygulaması fiyat ve oyun verilerini **ücretsiz, herkese açık** CheapShark ve Steam API'lerinden çeker. Bu servislerin **istek limiti** vardır.

**Önemli:** Uygulamayı yoğun kullanırsan — özellikle arama, kategori gezintisi ve oyun detayları arasında sık geçiş yaparsan — kısa sürede **HTTP 429 (Too Many Requests)** hatası alabilirsin. Bu durumda:

- Yeni aramalar ve canlı fiyat sorguları **geçici olarak yanıt vermez** veya eksik döner
- Limit genelde bir süre sonra kendiliğinden kalkar; sayfayı yenilemek veya birkaç dakika beklemek gerekir
- Bu proje öğrenme amaçlı olduğu için **cache, CDN, API anahtarı veya ücretli proxy** gibi production çözümleri uygulanmamıştır

Mobil uygulamalar bu sorunu yaşamaz; `public/demo-snapshot.json` dosyasından statik veri okur.

Snapshot'ı elle güncellemek için (yine 429 riski taşır):

```bash
npm run snapshot:demo
# veya
node scripts/refresh-demo-prices.mjs
```

---

## Ortam değişkenleri

`.env.example` dosyasına bakın. Production'da Steam API'yi farklı bir proxy üzerinden kullanmak istersen:

```env
VITE_STEAM_API_BASE=https://your-proxy.example.com
```

---

## Vercel'de yayınlama

Web arayüzü (kök klasör) Vercel ile deploy edilebilir. `server/` ve mobil klasörleri bu deploy'a dahil değildir.

| Ayar | Değer |
|------|-------|
| Framework Preset | Vite |
| Root Directory | `.` (proje kökü) |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |
| Node.js | 20.x |

`vercel.json` Steam API için proxy rewrite içerir; ek ortam değişkeni gerekmez.

### Adımlar

1. [vercel.com](https://vercel.com) hesabı aç (GitHub ile giriş önerilir).
2. **Add New → Project** → `yusufreyhan/priceplay` reposunu seç.
3. Yukarıdaki build ayarlarını doğrula, **Deploy**'a bas.
4. İlk build bitince Vercel domain adresin hazır olur (ör. `https://priceplay-lemon.vercel.app`).
5. Bu adresi README'deki **Canlı demo** satırına ekle ve GitHub'a push et.

---

## Ekran görüntüleri

> _Yakında eklenecek._

---

## Lisans

Bu proje eğitim amaçlıdır; kaynak kod serbestçe incelenebilir. CheapShark ve Steam verileri ilgili servislerin kullanım koşullarına tabidir.

---

## Geliştirici

**Yusuf Reyhan** — [GitHub](https://github.com/yusufreyhan)
