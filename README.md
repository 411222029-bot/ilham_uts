# Nusantara Flix - Pertemuan 5

Proyek contoh sederhana untuk mengelola data media.

Endpoint penting:

- PUT /media/:id_media
  - Deskripsi: Memperbarui data media (judul, tahun_rilis, genre) berdasarkan `id_media`.
  - Request body (JSON):
    {
    "judul": "Nama Baru",
    "tahun_rilis": 2024,
    "genre": "Drama"
    }
  - Response:
    - 200: { message: "Data media berhasil diperbarui." }
    - 404: { message: "Media tidak ditemukan." }
    - 400: { message: "Field judul, tahun_rilis, dan genre wajib diisi." }
    - 500: { message: "Terjadi kesalahan server." }

Cara menjalankan (Windows PowerShell):

```powershell
# Install dependencies (jalankan sekali)
npm install

# Pastikan MySQL berjalan dan database 'media' serta tabel 'media' sudah ada.
# Sesuaikan konfigurasi koneksi di server.js jika perlu (host/user/password/database).

# Jalankan server
node server.js
```

Contoh pengujian dengan curl (PowerShell):

```powershell
curl -Method PUT `
  -Uri http://localhost:3000/media/1 `
  -ContentType 'application/json' `
  -Body '{"judul":"Judul Baru","tahun_rilis":2025,"genre":"Komedi"}'
```

Catatan:

- `server.js` menggunakan modul `mysql2`.
- Jika menggunakan MySQL dengan kredensial/host berbeda, ubah konfigurasi pool di `server.js`.
