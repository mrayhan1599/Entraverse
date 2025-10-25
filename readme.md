## Entraverse Admin

Halaman admin Entraverse kini menggunakan Supabase sebagai basis data untuk autentikasi, produk, dan kategori.

### Konfigurasi Supabase

1. Buat proyek baru di [Supabase](https://supabase.com/).
2. Buka **SQL Editor** dan jalankan skrip berikut untuk menyiapkan tabel yang dibutuhkan:

   ```sql
   create table if not exists public.users (
     id uuid primary key,
     name text not null,
     company text not null,
     email text not null unique,
     password_hash text not null,
     created_at timestamptz not null default timezone('utc', now()),
     updated_at timestamptz
   );

   create table if not exists public.categories (
     id text primary key,
     name text not null,
     note text,
     fees jsonb default '{}'::jsonb,
     margin jsonb default '{}'::jsonb,
     created_at timestamptz not null default timezone('utc', now()),
     updated_at timestamptz
   );

   create table if not exists public.products (
     id uuid primary key,
     name text not null,
     category text not null,
     brand text,
     description text,
     trade_in boolean default false,
     inventory jsonb,
     photos text[] default '{}',
     variants jsonb default '[]'::jsonb,
     variant_pricing jsonb default '[]'::jsonb,
     created_at timestamptz not null default timezone('utc', now()),
     updated_at timestamptz
   );
   ```

3. Aktifkan Row Level Security (RLS) sesuai kebutuhan dan pastikan aturan mengizinkan akses dari `anon` key untuk operasi yang diperlukan selama pengembangan.
4. Salin **Project URL** dan **Anon public key** dari menu **Project Settings → API**.

### Konfigurasi aplikasi

1. Buka salah satu berkas HTML (`index.html`, `register.html`, `dashboard.html`, `add-product.html`, atau `categories.html`).
2. Ubah nilai pada blok konfigurasi berikut agar sesuai dengan kredensial Supabase Anda:

   ```html
   <script>
     window.entraverseConfig = window.entraverseConfig || {};
     window.entraverseConfig.supabase = window.entraverseConfig.supabase || {
       url: 'https://your-project.supabase.co',
       anonKey: 'public-anon-key'
     };
   </script>
   ```

   Anda dapat menaruh konfigurasi ini di satu file terpisah dan memuatnya sebelum `assets/js/app.js` bila diperlukan.

3. Setelah konfigurasi benar, aplikasi akan otomatis melakukan seeding data awal (produk dan kategori contoh) saat pertama kali dijalankan.

> **Catatan migrasi:** Jika Anda sebelumnya sudah memiliki data kategori lama (dengan kolom *Bonus* atau *Tren Margin*), versi aplikasi ini akan otomatis menormalkan ulang setiap baris kategori pada saat startup. Tidak ada langkah manual yang wajib dilakukan. Apabila Anda ingin merapikan skema tabel, Anda dapat menjalankan perintah berikut di SQL Editor Supabase setelah memastikan semua data sudah tersinkron:

```sql
alter table public.categories drop column if exists bonus;
alter table public.categories drop column if exists margin_trend;
alter table public.categories drop column if exists margin_note;
```

Perintah di atas bersifat opsional; aplikasi akan tetap berjalan tanpa perlu dijalankan.

### Pengembangan lokal

Proyek ini merupakan aplikasi statis. Anda dapat menjalankannya dengan server statis apa pun, misalnya:

```bash
npm install -g serve
serve .
```

Pastikan koneksi internet aktif agar library Supabase dapat dimuat dari CDN.

