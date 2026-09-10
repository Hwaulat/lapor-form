# PRD (BRIEF) — APLIKASI MOBILE PENGISIAN FORM LAPORAN EHS
**Product Requirements Document — Ringkas**

| | |
|---|---|
| **Nama Produk** | Aplikasi Pengisian Form Laporan (BOS, Nearmiss, QRP, Kondisi Tidak Aman) |
| **Platform** | Mobile App |
| **Versi Dokumen** | 1.0 — Brief |

---

## 1. LATAR BELAKANG

Perusahaan membutuhkan aplikasi mobile untuk pengisian 5 jenis form laporan terkait keselamatan kerja (safety/EHS observation) oleh karyawan: **Lapor Bos V2**, **Lapor Bos V3**, **Lapor Nearmiss**, **Lapor QRP**, dan **Lapor Kondisi Tidak Aman**. Setiap form memiliki field pertanyaan berbeda, namun harus mengikuti pola interaksi yang konsisten: pengisian bertahap (stepper), pertanyaan dwibahasa (Indonesia + Inggris), dan aturan kuota harian.

---

## 2. TUJUAN

1. Menyediakan satu aplikasi terpusat untuk 5 jenis laporan safety yang berbeda
2. Memastikan kepatuhan pengisian harian lewat aturan kuota (5 form/hari) tanpa membuat karyawan kehilangan kesempatan mengisi laporan yang tertunda
3. Memudahkan pemahaman pertanyaan lewat dwibahasa (Indonesia sebagai utama, Inggris sebagai terjemahan pendamping)
4. Alur pengisian yang cepat & jelas lewat stepper per form

---

## 3. PENGGUNA

**Karyawan** (Employee) — pengguna tunggal aplikasi ini di fase awal. Diasumsikan wajib memiliki NIK Mondelez/ESPE untuk sebagian besar form (lihat pertanyaan gerbang di setiap form).

> Tidak disebutkan kebutuhan role admin/back-office di brief ini — jika ada kebutuhan dashboard pemantauan pengisian oleh HR/Safety Officer, mohon konfirmasi terpisah karena akan menambah scope.

---

## 4. TECH STACK (REKOMENDASI)

| Layer | Teknologi | Catatan |
|---|---|---|
| Framework Mobile | React Native (Expo) | Cross-platform iOS & Android dari satu codebase, cocok untuk aplikasi form internal seperti ini |
| Bahasa | TypeScript | Type-safety untuk struktur form yang bervariasi per jenis laporan |
| Navigasi | Expo Router (file-based) | Termasuk alur stepper per form dan navigasi antar card |
| UI Components | React Native Paper atau Tamagui + komponen kustom | Form field (radio, dropdown, date picker, textarea) & stepper indicator |
| Icons | lucide-react-native | Konsisten dengan ikon status card (Belum Diisi/Sudah Diisi/Terkunci) |
| State Form | React Hook Form + Zod | Validasi tiap field sesuai tipe (angka, tanggal, batas karakter) dan pengelolaan state multi-step |
| Local DB (offline-first) | SQLite (`expo-sqlite`) | Draft pengisian tersimpan lokal dulu — penting karena user lapangan bisa saja sinyal lemah di area pabrik/gudang |
| Backend | Node.js (NestJS) atau Next.js API Routes | Menyimpan submission, menghitung status kuota harian per user |
| Database Server | PostgreSQL (Neon/Supabase) | Sumber kebenaran status kuota lintas device, jika user ganti HP |
| Autentikasi | Sesuai keputusan Section 10, poin 6 — kandidat: NIK + PIN sederhana, atau SSO internal perusahaan jika tersedia | Dibutuhkan untuk tracking kuota per user secara akurat |
| Sinkronisasi Offline→Online | Background sync queue (mis. `react-query` + retry queue kustom) | Submission yang dibuat saat offline (isi backlog di gudang/basement tanpa sinyal) otomatis terkirim saat online kembali |
| Notifikasi (opsional) | Expo Notifications | Pengingat jika ada form kemarin yang belum lengkap |
| Multi-bahasa (label dwibahasa) | Struktur teks statis disimpan sebagai pasangan `id`/`en` per pertanyaan (bukan library i18n penuh, karena kedua bahasa ditampilkan sekaligus, bukan dipilih salah satu) | Lihat Section 7 — format tampilan Indonesia+Inggris berdampingan |

> Catatan: stack di atas adalah rekomendasi berdasarkan kebutuhan yang dijelaskan di brief ini (form bertahap, offline-friendly, kuota harian per user). Tim engineering tetap bisa menyesuaikan dengan stack yang sudah ada di perusahaan bila relevan.

---

## 5. ATURAN BISNIS UTAMA — KUOTA HARIAN

Ini adalah logika paling kritis di aplikasi ini, dirinci secara eksplisit supaya tidak ambigu saat development.

### Aturan
- Setiap hari kalender, seorang user punya **5 slot form** (satu untuk tiap jenis: BOS V2, BOS V3, Nearmiss, QRP, Kondisi Tidak Aman)
- **Begitu ke-5 form untuk hari itu sudah terisi semua** → user **tidak bisa mengisi form baru untuk hari itu lagi** (kelima card di halaman utama terkunci/non-aktif untuk tanggal tersebut)
- **Jika ada hari sebelumnya yang belum lengkap 5 form** → user tetap bisa mengisi form yang masih kosong untuk **tanggal tersebut**, kapan pun, tidak peduli status hari ini sudah penuh atau belum

### Contoh Skenario
> User membuka aplikasi pada **10 Januari**.
> - 9 Januari (kemarin): baru terisi 3 dari 5 form → 2 form yang belum terisi **tetap bisa diisi** kapan saja, termasuk hari ini
> - 10 Januari (hari ini): baru terisi 0 dari 5 form → user bisa mengisi hingga 5 form untuk hari ini
> - Begitu ke-5 form 10 Januari terisi semua → user tidak bisa tambah form baru untuk **tanggal 10 Januari**, tapi form 9 Januari yang masih kurang (2 form tadi) **tetap bisa dilengkapi**

### Tampilan yang disarankan
- Halaman utama punya 2 area/tab:
  - **Hari Ini** — 5 card form untuk tanggal berjalan, dengan status per card (Belum Diisi / Sudah Diisi ✓ / Terkunci jika ke-5 sudah lengkap)
  - **Belum Lengkap** — daftar tanggal sebelumnya yang masih punya form kosong, user pilih tanggal → lanjut isi form yang kurang untuk tanggal itu

### Perlu dikonfirmasi (lihat juga Section 10 — Asumsi & Pertanyaan Terbuka)
- Apakah "hari" yang dimaksud aturan ini adalah **tanggal sistem/kalender saat user membuka app**, atau mengikuti field "tanggal observasi/kejadian" yang diisi user di dalam form itu sendiri? (Brief ini berasumsi: tanggal sistem/kalender)
- Apakah ada batas berapa hari ke belakang yang boleh "dilengkapi" (mis. maksimal 7 hari), atau tidak terbatas?

---

## 6. STRUKTUR APLIKASI

### Halaman Utama
- 5 **card** form, tiap card menampilkan:
  - Judul form (mis. "Lapor Bos V2")
  - Status hari ini: Belum Diisi / Sudah Diisi ✓ / Terkunci
  - Tap card → mulai stepper pengisian form terkait

### Pola Umum Tiap Form
- Semua form berbentuk **stepper** (wizard bertahap), bukan satu halaman panjang
- Tombol "Next" untuk lanjut ke tahap berikutnya, tombol "Back" untuk kembali mengoreksi
- Progress indicator di atas (menunjukkan sedang di tahap ke berapa dari total)

---

## 7. KEBUTUHAN DWIBAHASA (berlaku untuk SEMUA form & SEMUA pertanyaan)

- **Setiap pertanyaan** menampilkan teks Bahasa Indonesia sebagai teks utama (lebih besar/tebal), dan **tepat di bawahnya** teks terjemahan Bahasa Inggris (lebih kecil, warna lebih muted)
- Format konsisten:
  ```
  Apakah anda memiliki NIK karyawan Mondelez / ESPE?
  Do you have Mondelez's Employee ID?
  ```
- Berlaku di **semua field**, apapun jenisnya (radio, dropdown, free text, textarea, date) — bagian yang diterjemahkan adalah **label/pertanyaannya**, bukan jawaban yang diinput user
- Opsi jawaban pada dropdown/radio idealnya juga dwibahasa jika relevan (mis. "Ya / Yes", "Tidak / No") — perlu dikonfirmasi cakupannya (lihat Section 10)

---

## 8. KEBUTUHAN FUNGSIONAL PER FORM

### 7.1 — Lapor Bos V2

**Stepper 3 tahap:**

**Tahap 1 — Pertanyaan Gerbang**
| # | Pertanyaan | Tipe Field |
|---|---|---|
| 1 | Apakah anda memiliki NIK karyawan Mondelez / ESPE? / *Do you have Mondelez's Employee ID?* | Radio: Ya / Tidak |

- Jika **Ya** → lanjut ke Tahap 2
- Jika **Tidak** → *(perlu dikonfirmasi — lihat Section 10; asumsi sementara: tampilkan pesan bahwa form ini khusus untuk pemilik NIK Mondelez/ESPE, dan pengisian dihentikan)*

**Tahap 2 — Data Observasi**
| # | Pertanyaan | Tipe Field | Opsi |
|---|---|---|---|
| 2 | Masukan NIK anda | Free text | – |
| 3 | Pada tanggal berapa anda melakukan observasi? | Date picker | – |
| 4 | Pada shift berapa anda melakukan observasi? | Dropdown | Shift 1, Shift 2, Shift 3 |
| 5 | Dimanakah anda melakukan observasi? | Dropdown | Line 1, Line 2, Line 3, Line 4, Line 5, Line 6, Workshop, Warehouse Raw Material, Warehouse Packaging Material, Warehouse Finished Goods, Office Atas, Laboratorium Quality, Office R&D, Fasilitas Umum, Area Luar |
| 6 | Di area mana anda melakukan observasi? (Line Produksi) | Dropdown | Flour and Sugar Dump, Buhler Guerin, Mixing, Forming |

→ Tombol **Next** ke Tahap 3

**Tahap 3 — Temuan Observasi**
| # | Pertanyaan | Tipe Field |
|---|---|---|
| 7 | FSDU1 — Karyawan berjalan sambil menggunakan handphone | Free text (angka) |
| 8 | FSDS1 — Karyawan tidak berjalan sambil menggunakan handphone | Free text (angka) |
| 9 | FSDU2 — Karyawan memberdirikan/menyimpan pallet sembarangan | Free text (angka) |

→ Tombol **Submit** menyelesaikan pengisian

> Catatan penomoran: pada brief asli, penomoran pertanyaan di Tahap 2 & 3 sempat terlihat mengulang dari angka 2 — di dokumen ini dirapikan jadi urut 1-9 mengikuti urutan tampil, tanpa mengubah isi/urutan pertanyaan.

---

### 7.2 — Lapor Nearmiss

**Stepper 3 tahap:**

**Tahap 1 — Pertanyaan Gerbang**
| # | Pertanyaan | Tipe Field |
|---|---|---|
| 1 | Apakah anda memiliki NIK karyawan Mondelez / ESPE? / *Do you have Mondelez's Employee ID?* | Radio: Ya / Tidak |

- Jika **Ya** → lanjut ke Tahap 2
- Jika **Tidak** → *(sama seperti Lapor Bos V2, perlu dikonfirmasi)*

**Tahap 2 — Identitas Pelapor**
| # | Pertanyaan | Tipe Field |
|---|---|---|
| 2 | Masukan NIK anda | Free text |

→ Tombol **Next** ke Tahap 3

**Tahap 3 — Detail Kejadian Nearmiss**
| # | Pertanyaan | Tipe Field | Catatan |
|---|---|---|---|
| 3 | Sebutkan nama, divisi, dan perusahaan dari personil yang hampir celaka | Free text | – |
| 4 | Pada tanggal berapa kejadian terjadi? | Date picker | – |
| 5 | Pada shift berapa kejadian terjadi? | Dropdown | Shift 1, Shift 2, Shift 3 |
| 6 | Jelaskan kejadian yang ingin anda laporkan | Textarea | Maks. 500 karakter, tampilkan sisa karakter berjalan |

→ Tombol **Submit**

---

### 7.3 — Lapor Bos V3, Lapor QRP, Lapor Kondisi Tidak Aman

**Field belum dirinci di brief ini.** Ketiga form ini diasumsikan mengikuti pola struktural yang sama dengan 2 form di atas (stepper, dwibahasa, kemungkinan pertanyaan gerbang NIK di tahap pertama), namun **daftar pertanyaan spesifiknya perlu dilengkapi terpisah** sebelum development dimulai untuk 3 form ini.

---

## 9. MODEL DATA (RINGKAS)

```typescript
interface FormSubmission {
  id: string;
  form_type: 'bos_v2' | 'bos_v3' | 'nearmiss' | 'qrp' | 'kondisi_tidak_aman';
  user_id: string;
  submission_date: string;        // tanggal kuota (bukan selalu = tanggal submit aktual, jika mengisi backlog)
  submitted_at: string;           // timestamp aktual pengisian
  answers: Record<string, any>;   // jawaban tiap field, key = nomor/kode pertanyaan
  has_employee_id: boolean;       // hasil pertanyaan gerbang
}

interface DailyQuotaStatus {
  user_id: string;
  date: string;
  forms_completed: string[];      // daftar form_type yang sudah terisi untuk tanggal ini
  is_complete: boolean;           // true jika forms_completed.length === 5
}
```

---

## 10. ASUMSI & PERTANYAAN TERBUKA (penting — konfirmasi sebelum development)

| # | Item | Catatan |
|---|---|---|
| 1 | Definisi "hari" untuk kuota | Diasumsikan tanggal sistem/kalender saat user membuka app, bukan field tanggal di dalam form. Perlu konfirmasi. |
| 2 | Batas hari ke belakang untuk "melengkapi" | Belum ditentukan — apakah bebas berapa lama pun, atau ada batas (mis. maksimal 7 hari terakhir)? |
| 3 | Jalur jika jawab "Tidak" pada pertanyaan gerbang NIK | Belum dijelaskan di brief — apakah form berhenti total, atau ada alur alternatif untuk non-karyawan? |
| 4 | Field lengkap Lapor Bos V3, Lapor QRP, Lapor Kondisi Tidak Aman | Belum dirinci — dibutuhkan sebelum development modul ini dimulai |
| 5 | Cakupan dwibahasa pada opsi jawaban (dropdown/radio) | Contoh yang diberikan (Ya/Tidak) menyertakan istilah Inggris pada pertanyaan; perlu dikonfirmasi apakah label tiap opsi dropdown (mis. nama Line, nama Shift) juga wajib diterjemahkan, atau cukup label pertanyaan saja |
| 6 | Kebutuhan akun/login | Belum disebutkan — diasumsikan tetap ada identitas user (untuk tracking kuota harian per orang), metode login/autentikasi perlu ditentukan terpisah |
| 7 | Edit/hapus setelah submit | Belum dijelaskan — apakah form yang sudah disubmit bisa diedit, atau final begitu disubmit? |
| 8 | Dashboard/monitoring untuk HR atau Safety Officer | Belum diminta di brief ini — jika dibutuhkan, akan menambah scope (lihat Section 3) |

---

## 11. NON-FUNGSIONAL (ringkas)

- Aplikasi harus tetap bisa dipakai lancar dari HP karyawan lapangan (mobile-first, ringan)
- Validasi tiap field sesuai tipe (tanggal tidak boleh di masa depan untuk field observasi, angka tidak boleh negatif untuk field FSDU/FSDS, dsb.) — detail aturan validasi per field perlu dikonfirmasi
- Textarea Nearmiss menampilkan penghitung karakter real-time (maks. 500)
- Status kuota harian harus update seketika setelah submit (card di halaman utama langsung berubah status tanpa perlu refresh manual)
