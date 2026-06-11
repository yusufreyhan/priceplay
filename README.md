# PricePlay

Oyun fiyatlarını karşılaştıran, indirimleri keşfetmeni sağlayan bir web uygulaması. CheapShark ve Steam Store API'lerinden canlı veri çeker; mobil tarafta ise yerel snapshot ile çalışır.

## Canlı site

### 👉 [https://priceplay-lemon.vercel.app](https://priceplay-lemon.vercel.app/#/)

---

## ⚠️ API istek sınırı — mutlaka oku

Canlı sitede fiyat ve oyun verileri **ücretsiz CheapShark ve Steam API**'lerinden çekilir. Bu servislerin **sıkı istek limiti** vardır.

**Birkaç arama veya sayfa gezintisinden sonra API istek sınırına ulaşırsın** ve uygulama **HTTP 429 (Too Many Requests)** hatası verir. Bu beklenen bir durumdur; proje hatası değildir.

| Ne olur? | Ne yapmalısın? |
|----------|----------------|
| Arama ve fiyat sorguları çalışmaz veya eksik döner | Birkaç dakika bekle |
| Oyun detayları yüklenmez | Sayfayı yenileme; önce bekle |
| Limit kalkınca site normale döner | Tekrar dene |

Bu proje öğrenme amaçlıdır; cache, CDN veya ücretli API anahtarı kullanılmamıştır. **Yoğun kullanımda site kısa süreliğine kısıtlanır** — canlı demoyu test ederken bunu göz önünde bulundur.

Mobil uygulamalar canlı API kullanmaz; yerel `demo-snapshot.json` dosyasından okur ve bu sınıra takılmaz.

---

> **Bu proje bir öğrenme / portföy projesidir.** Üniversite sürecinde React, TypeScript, API entegrasyonu ve çoklu platform mimarisi pratiği için geliştirilmiştir. Ticari bir ürün değildir.

---

## Özellikler

- **Ana sayfa vitrini** — Popüler oyunlar, indirimli fırsatlar, yeni çıkanlar ve ücretsiz oyunlar
- **Oyun arama** — CheapShark üzerinden canlı arama
- **Oyun detayı** — Mağaza bazlı fiyat karşılaştırması, Steam açıklaması, sistem gereksinimleri, örnek fiyat geçmişi grafiği
- **Kategori gezintisi** — Tür, etiket ve vitrin listeleri
- **Favoriler** — Giriş yapan kullanıcı için tarayıcıda saklanan favori listesi
- **Kullanıcı hesabı** — Kayıt, giriş ve profil düzenleme (yerel depolama)
- **Mobil uygulamalar** — Flutter ve React Native (Expo) sürümleri

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
npm install
npm run dev      # http://localhost:5173
npm run build
```

Geliştirme modunda Steam API istekleri Vite proxy üzerinden yönlendirilir (`/steam-store` → `store.steampowered.com`).

### Backend (isteğe bağlı)

```bash
cd server
npm install
npm run dev      # http://localhost:8787
```

İlk çalıştırmada:

```bash
cp server/data/users.json.example server/data/users.json
```

Web arayüzündeki giriş / kayıt akışı **tarayıcı localStorage** kullanır.

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

## Ortam değişkenleri

`.env.example` dosyasına bakın. Steam API'yi farklı bir proxy üzerinden kullanmak için:

```env
VITE_STEAM_API_BASE=https://your-proxy.example.com
```

---

## Lisans

Bu proje eğitim amaçlıdır; kaynak kod serbestçe incelenebilir. CheapShark ve Steam verileri ilgili servislerin kullanım koşullarına tabidir.

---

## Geliştirici

**Yusuf Reyhan** — [GitHub](https://github.com/yusufreyhan)
