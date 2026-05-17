# Fitur Kalender dan Galeri - Panduan Lengkap

## 📅 Fitur Kalender

### Deskripsi
Fitur Kalender memungkinkan admin untuk mengelola jadwal kompetisi dan event. Jadwal ini akan ditampilkan kepada user umum untuk melihat acara-acara mendatang.

### Untuk Admin

#### Akses Menu
- Menu: `Dashboard > Manage > Kelola Jadwal`
- URL: `/dashboard/manage/calendars`

#### Fitur CRUD
1. **Lihat Semua Jadwal** (`/dashboard/manage/calendars`)
   - Tampilan list semua jadwal yang sudah dibuat
   - Filter berdasarkan status aktif/nonaktif
   - Menampilkan ringkasan: judul, tipe, waktu, lokasi

2. **Tambah Jadwal Baru** (`/dashboard/manage/calendars/create`)
   - Isi form dengan detail:
     - **Judul**: Nama acara/kompetisi
     - **Tipe Acara**: Pilih antara Kompetisi atau Event
     - **Deskripsi**: Penjelasan detail (opsional)
     - **Tanggal & Jam Mulai**: Waktu acara dimulai
     - **Tanggal & Jam Berakhir**: Waktu acara berakhir
     - **Lokasi**: Tempat penyelenggaraan
     - **Aktif**: Checkbox untuk menampilkan/menyembunyikan

3. **Edit Jadwal** (`/dashboard/manage/calendars/{id}/edit`)
   - Ubah data jadwal yang sudah ada
   - Semua field dapat dimodifikasi

4. **Hapus Jadwal** 
   - Klik tombol "Hapus" untuk menghapus jadwal
   - Konfirmasi sebelum penghapusan

### Untuk User (Public)

#### Akses
- Menu: Navigasi utama atau URL: `/calendars`
- Nama halaman: "Jadwal Kompetisi & Event"

#### Fitur View
1. **Filter Acara**
   - **Semua**: Menampilkan semua acara
   - **Kompetisi**: Hanya acara bertipe kompetisi
   - **Event**: Hanya acara bertipe event

2. **Kategori Tampilan**
   - **Akan Datang**: Acara yang belum berlangsung
   - **Acara Sebelumnya**: Acara yang sudah selesai

3. **Detail Setiap Acara**
   - Judul dan tipe acara (dengan badge warna)
   - Deskripsi lengkap
   - Tanggal dan jam mulai/berakhir
   - Lokasi acara

4. **Desain**
   - Responsive untuk semua ukuran layar
   - Warna berbeda untuk kompetisi (biru) dan event (ungu)
   - Acara sebelumnya tampil dengan opacity lebih rendah

---

## 🖼️ Fitur Galeri

### Deskripsi
Fitur Galeri memungkinkan admin untuk mengelola koleksi foto dari berbagai acara dan kompetisi. Galeri ini ditampilkan dengan desain menarik dan fitur lightbox untuk melihat foto secara detail.

### Untuk Admin

#### Akses Menu
- Menu: `Dashboard > Manage > Kelola Galeri`
- URL: `/dashboard/manage/galleries`

#### Fitur CRUD
1. **Lihat Semua Foto** (`/dashboard/manage/galleries`)
   - Grid layout foto dengan preview
   - Menampilkan judul, deskripsi (snippet), dan status
   - Quick access buttons untuk Edit dan Hapus

2. **Tambah Foto Baru** (`/dashboard/manage/galleries/create`)
   - Isi form dengan:
     - **Judul Foto**: Nama/judul foto
     - **Deskripsi**: Penjelasan detail foto (opsional)
     - **Unggah Foto**: Drag & drop atau klik untuk memilih
       - Format: JPG, PNG, GIF
       - Ukuran maksimal: 2MB
     - **Aktif**: Checkbox untuk menampilkan/menyembunyikan
   - Preview real-time sebelum unggah

3. **Edit Foto** (`/dashboard/manage/galleries/{id}/edit`)
   - Ubah judul, deskripsi, dan status
   - Ganti foto dengan foto baru (opsional)
   - Tampilan foto saat ini sebagai referensi

4. **Hapus Foto**
   - Klik tombol "Hapus" untuk menghapus foto
   - Konfirmasi sebelum penghapusan

### Untuk User (Public)

#### Akses
- Menu: Navigasi utama atau URL: `/galleries`
- Nama halaman: "Galeri Foto"

#### Fitur View
1. **Grid Layout**
   - Tampilan responsive (1 kolom mobile, 2 tablet, 3 desktop)
   - Foto dengan aspect ratio persegi
   - Hover effect: zoom dan overlay teks

2. **Lightbox/Modal**
   - Klik foto untuk membuka tampilan full-size
   - Lihat judul, deskripsi lengkap, dan tanggal upload
   - Close button di atas untuk menutup modal
   - Klik di luar modal untuk menutup

3. **Pagination**
   - 12 foto per halaman
   - Navigasi pagination untuk melihat foto lebih banyak
   - Link aktif (highlighted)

4. **Desain**
   - Header gradient biru
   - Photo cards dengan shadow dan hover effect
   - Modal dengan desain modern dan bersih

---

## 🎨 Database Schema

### Tabel: calendars
```sql
- id (Primary Key)
- title (string)
- description (longText, nullable)
- start_date (dateTime)
- end_date (dateTime)
- location (string, nullable)
- event_type (string: 'kompetisi' | 'event')
- is_active (boolean, default: true)
- created_at
- updated_at
```

### Tabel: galleries
```sql
- id (Primary Key)
- title (string)
- description (longText, nullable)
- image_path (string)
- is_active (boolean, default: true)
- created_at
- updated_at
```

---

## 🚀 Routes

### Admin Routes (Protected dengan role:admin)
```
GET     /dashboard/manage/calendars              → admin.calendars.index
GET     /dashboard/manage/calendars/create       → admin.calendars.create
POST    /dashboard/manage/calendars              → admin.calendars.store
GET     /dashboard/manage/calendars/{id}/edit    → admin.calendars.edit
PATCH   /dashboard/manage/calendars/{id}         → admin.calendars.update
DELETE  /dashboard/manage/calendars/{id}         → admin.calendars.destroy

GET     /dashboard/manage/galleries              → admin.galleries.index
GET     /dashboard/manage/galleries/create       → admin.galleries.create
POST    /dashboard/manage/galleries              → admin.galleries.store
GET     /dashboard/manage/galleries/{id}/edit    → admin.galleries.edit
PATCH   /dashboard/manage/galleries/{id}         → admin.galleries.update
DELETE  /dashboard/manage/galleries/{id}         → admin.galleries.destroy
```

### Public Routes
```
GET     /calendars                               → calendars.view
GET     /galleries                               → galleries.view
```

---

## 📝 Validasi

### Calendar
- **title**: Required, string, max 255 karakter
- **description**: Optional, string
- **start_date**: Required, format: YYYY-MM-DD HH:MM
- **end_date**: Required, format: YYYY-MM-DD HH:MM, harus lebih besar dari start_date
- **location**: Optional, string, max 255 karakter
- **event_type**: Required, harus 'kompetisi' atau 'event'
- **is_active**: Required, boolean

### Gallery
- **title**: Required, string, max 255 karakter
- **description**: Optional, string
- **image**: Required (create), optional (update), format: JPEG/PNG/JPG/GIF, max 2MB
- **is_active**: Required, boolean

---

## 🎯 Tips Penggunaan

### Kalender
1. Atur **tanggal berakhir** yang tepat untuk event multi-hari
2. Gunakan **deskripsi** untuk memberikan informasi tambahan (peserta, hadiah, dll)
3. Aktifkan **is_active** hanya untuk acara yang akan ditampilkan kepada user
4. Tipe acara "Kompetisi" untuk pertandingan, "Event" untuk acara lainnya

### Galeri
1. Gunakan **judul** yang deskriptif untuk setiap foto
2. Isi **deskripsi** dengan konteks foto (kapan, dimana, siapa, dll)
3. **Optimasi ukuran** foto sebelum upload untuk performa lebih baik
4. Nonaktifkan foto jika tidak ingin ditampilkan tanpa harus menghapusnya

---

## 🔧 File Struktur

```
app/Models/
  ├── Calendar.php
  └── Gallery.php

app/Http/Controllers/
  ├── AdminCalendarController.php
  └── AdminGalleryController.php

database/migrations/
  ├── 2026_05_17_100000_create_calendars_table.php
  └── 2026_05_17_100001_create_galleries_table.php

resources/js/pages/Admin/
  ├── Calendars/
  │   ├── Index.jsx
  │   ├── Create.jsx
  │   └── Edit.jsx
  └── Galleries/
      ├── Index.jsx
      ├── Create.jsx
      └── Edit.jsx

resources/js/pages/Public/
  ├── Calendars.jsx
  └── Galleries.jsx

routes/web.php (Updated)
```

---

## 📱 Responsiveness

Kedua fitur dirancang fully responsive:
- **Mobile**: Optimasi untuk layar kecil, layout single column
- **Tablet**: Layout 2 kolom untuk galeri
- **Desktop**: Layout lengkap dengan 3 kolom untuk galeri

---

## 🎨 Styling

Semua komponen menggunakan:
- **Tailwind CSS** untuk styling
- **Design System**: Mengikuti style yang sudah ada di aplikasi
- **Color Scheme**: 
  - Primary: #1d4ed8 (Biru)
  - Secondary: #111827 (Abu-abu gelap)
  - Kompetisi: Biru
  - Event: Ungu

---

Dibuat pada: 17 Mei 2026
