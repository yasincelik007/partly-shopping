# 🌐 PARTLY Shopping

## The Industrial Meta-Commerce Ecosystem

> **"Don't just buy a product. Own every single part of it."**

---

## 📌 İçindekiler

1. Proje Özeti
2. Vizyon & Problem Tanımı
3. Çözüm Yaklaşımı
4. Mantık Haritası (System Logic Map)
5. Teknik Mimari (The Stack)
6. Veri Modeli & Hiyerarşi
7. AI & Eşleştirme Motoru
8. Kullanıcı Deneyimi (The PARTLY Flow)
9. Ayırt Edici Özellikler
10. API & Entegrasyon Mimarisi
11. Güvenlik & Ölçeklenebilirlik
12. Roadmap
13. Katkı Rehberi
14. Lisans

---

# 1️⃣ Proje Özeti

**PARTLY Shopping**, e-ticareti 2D fotoğraflardan çıkarıp **Digital Twin (Dijital İkiz)** tabanlı etkileşimli mühendislik deneyimine dönüştüren meta-ticaret platformudur.

Geleneksel pazar yerleri ürünün yüzeyini gösterir.
PARTLY ürünün **iç mimarisini**, vida seviyesine kadar açar.

Bir motoru satın almazsınız.
İçindeki **M6x15 civatayı** seçer, küresel pazarlardan en uygun fiyatı alırsınız.

---

# 2️⃣ Vizyon & Problem Tanımı

## 🎯 Problem

Geleneksel e-ticarette:

* Ürünler "kapalı kutu" olarak satılır
* Parça uyumluluğu belirsizdir
* Teknik veri eksiktir
* Arıza teşhisi uzmanlık gerektirir
* OEM kodları karmaşıktır
* Parça arama metin bazlıdır

## 🌍 Vizyon

Fiziksel nesneleri **şeffaf**, **modüler** ve **veriye dayalı** hale getirmek.

PARTLY ile:

* Ürünler **patlatılmış görünüm** (Exploded View) ile incelenir
* Parçalar %100 teknik eşleşmeyle bulunur
* Küresel fiyatlar anlık karşılaştırılır
* AR ile fiziksel dünya dijital ikizle birleşir

---

# 3️⃣ Çözüm Yaklaşımı

PARTLY üç temel sütun üzerine inşa edilmiştir:

1. **Görsel Motor (3D Digital Twin)**
2. **Zeka Katmanı (AI + OEM Matching)**
3. **Küresel Meta-Commerce Ağı**

---

# 4️⃣ 🧠 Mantık Haritası (System Logic Map)

```
KULLANICI
   ↓
Ürün Seçimi
   ↓
3D Digital Twin Yükleme
   ↓
Exploded View
   ↓
Parça Seçimi (Click on Mesh)
   ↓
Parça ID → Graph DB Sorgusu
   ↓
OEM Kodları → AI Eşleştirme
   ↓
Global Marketplace API / Scraper
   ↓
Fiyat + Stok + Uyumluluk
   ↓
Sepet
   ↓
Opsiyonel:
   - Servis Randevusu
   - AR Rehberi
   - Printable Lisans
```

---

# 5️⃣ 🛠 Teknik Mimari (The Stack)

## 🎮 1. Görsel Motor (Visual Core)

* Engine: **Three.js** + React Three Fiber
* Rendering: WebGPU + PBR
* Format: glTF / GLB
* LOD Sistemi:

  * LOD0 → Vida dişleri
  * LOD1 → Parça formu
  * LOD2 → Siluet modeli

### Özellikler

* Gerçek zamanlı ışık simülasyonu
* Shader tabanlı metal & granaj dokuları
* Dinamik patlatma animasyon sistemi
* Parça bazlı mesh ID sistemi

---

## 🤖 2. Zeka Katmanı (AI & Scraping)

### PARTLY-Sense AI

* Görüntü işleme
* NLP ile teknik döküman analizi
* OEM eşleştirme algoritması
* Predictive Maintenance Modeli

Fonksiyonlar:

* Parça kodu çıkarımı
* Uyumluluk kontrolü
* Ortalama kullanım ömrü tahmini
* Arıza olasılığı skoru

---

### 🌍 Dynamic Scraper Engine

* Python + FastAPI
* Dağıtık bot mimarisi
* 15 dakikada stok güncelleme
* Rate-limit adaptive crawling
* Marketplace normalizasyon katmanı

Desteklenen platform örnekleri:

* Amazon
* eBay

---

# 6️⃣ 🗄 Veri Hiyerarşisi (Graph Architecture)

Veritabanı: Neo4j (Graph DB)

### Örnek Hiyerarşi

```
Ducati Panigale V4
 └── Motor Bloğu
      ├── Krank Mili
      │     └── Rulman
      │           └── Vida (M6x15)
      └── Conta
```

Her node:

* part_id
* oem_code
* torque_value
* material
* weight
* compatibility_map
* lifecycle_estimate

### Avantaj

Bir parça seçildiğinde:

* İlişkili contalar önerilir
* Alternatif üretici parçalar listelenir
* Uyumlu model varyasyonları gösterilir

---

# 7️⃣ 🔍 AI Eşleştirme Mekanizması

### Girdi

* 3D mesh ID
* Teknik döküman PDF
* Görsel analiz
* Kullanıcı yüklemeleri

### Süreç

1. Feature extraction
2. OEM code inference
3. Graph relation scan
4. Marketplace search
5. Price clustering
6. Reliability scoring

### Çıktı

```
{
  "oem": "DUC-44321-A",
  "confidence": 0.97,
  "lifecycle_km": 20000,
  "price_range": [40, 55],
  "best_offer": "Local Vendor $40"
}
```

---

# 8️⃣ 🔄 Kullanıcı Deneyimi (The PARTLY Flow)

## 1️⃣ 3D Giriş

Örnek: Ducati Panigale V4 seçilir.
360° dönebilen yüksek çözünürlüklü model yüklenir.

---

## 2️⃣ Exploded Mode

"Parçala" butonuyla:

* Granajlar ayrılır
* Motor bloğu açılır
* Elektrik tesisatı görünür

Animasyon GPU hızlandırmalıdır.

---

## 3️⃣ Akıllı Side Panel

Seçilen parça için:

* Malzeme türü
* Ağırlık
* Tork sıkma değeri
* Kullanım ömrü tahmini
* Küresel fiyat karşılaştırması

---

## 4️⃣ Satın Alma + Servis

Sepete ekleme sonrası:

* Yetkili servis önerisi
* Montaj randevusu
* AR montaj rehberi

---

# 9️⃣ 💎 Ayırt Edici Özellikler

| Özellik       | Geleneksel E-Ticaret | PARTLY                 |
| ------------- | -------------------- | ---------------------- |
| Ürün Görseli  | 2D Fotoğraf          | 3D Digital Twin        |
| Parça Bulma   | Metin Araması        | Modele Tıklama         |
| Uyumluluk     | Belirsiz             | %100 Teknik Eşleşme    |
| Derinlik      | Yüzeysel             | Vida seviyesinde detay |
| Bakım Tahmini | Yok                  | AI Predictive          |

---

# 🔮 AR Entegrasyonu

Telefonu motora tut →
PARTLY:

* Değişmesi gereken parçayı işaretler
* 3D overlay gösterir
* Tork değerini canlı gösterir

---

# 🧩 3D Studio

Kullanıcılar:

* Kendi parçalarını tasarlar
* STL/GLB yükler
* Printable lisans satar
* Topluluk oylaması alır

---

# 🔐 Güvenlik & Ölçeklenebilirlik

* JWT Authentication
* OAuth Marketplace bağlantıları
* Microservice mimarisi
* Kubernetes deployment
* CDN tabanlı 3D asset dağıtımı
* Edge rendering

---

# 📡 API Mimarisi

### Core Endpoints

```
GET   /product/:id
GET   /product/:id/exploded
GET   /part/:id
GET   /part/:id/offers
POST  /cart/add
POST  /ai/match
```

---

# 📅 Roadmap

## 🚀 Faz 1 – Genesis (Q1–Q2 2026)

* Otomotiv & Drone Master Model Library
* 50 global marketplace entegrasyonu
* AI OEM Matching v1

---

## 🌍 Faz 2 – Ecosystem (Q3–Q4 2026)

* PARTLY-Pay
* İkinci el parça pazarı
* Printable Part lisans sistemi

---

## 🏭 Faz 3 – Industry 4.0 (2027)

Hedef entegrasyonlar:

* Tesla
* Bosch
* Samsung

Her ürün için:

* PARTLY ID
* Dijital sertifikasyon
* Fabrika çıkışlı dijital ikiz

---

# 🤝 Katkı Rehberi

```
git clone https://github.com/partly-shopping/core.git
```

## Kurulum

```
npm install
npm run dev
```

## Katkı Alanları

* 3D model optimizasyonu
* AI OEM matching
* Scraper performans iyileştirme
* UI/UX geliştirme
* Graph DB modelleme

---

# 📜 Lisans

MIT License

---

# 🔚 Sonuç

PARTLY Shopping, e-ticareti yüzeyden derinliğe taşıyan bir **meta-commerce altyapısıdır**.

Bu sadece bir marketplace değil.
Bu, fiziksel dünyanın **dijital şeffaflığıdır**.

**PARTLY Shopping — The object is no longer a mystery.**
