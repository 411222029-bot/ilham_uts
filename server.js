// Import library
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

// Inisialisasi aplikasi Express
const app = express();
app.use(bodyParser.json());
app.use(cors());
// Serve static files (index.html) from project root
app.use(express.static(__dirname));

// Konfigurasi koneksi database (pool)
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "nusantara_flix",
});

// Endpoint PUT untuk Update Data Media
app.put("/media/:id_media", (req, res) => {
  const { id_media } = req.params;
  const { judul, tahun_rilis, genre } = req.body;

  // Validasi data input
  if (!judul || !tahun_rilis || !genre) {
    return res
      .status(400)
      .json({ message: "Field judul, tahun_rilis, dan genre wajib diisi." });
  }

  // Query update data
  const query = `
    UPDATE media 
    SET judul = ?, tahun_rilis = ?, genre = ?
    WHERE id_media = ?
  `;

  pool.query(query, [judul, tahun_rilis, genre, id_media], (err, result) => {
    if (err) {
      console.error("Kesalahan saat mengupdate data:", err);
      return res.status(500).json({ message: "Terjadi kesalahan server." });
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Data media berhasil diperbarui." });
    } else {
      res.status(404).json({ message: "Media tidak ditemukan." });
    }
  });
});

// Endpoint GET - ambil semua media
app.get("/media", (req, res) => {
  const query = "SELECT * FROM media ORDER BY id_media ASC";
  pool.query(query, (err, results) => {
    if (err) {
      console.error("Kesalahan saat mengambil data:", err);
      return res.status(500).json({ message: "Terjadi kesalahan server." });
    }
    res.json(results);
  });
});

// Endpoint GET by id
app.get("/media/:id_media", (req, res) => {
  const { id_media } = req.params;
  const query = "SELECT * FROM media WHERE id_media = ?";
  pool.query(query, [id_media], (err, results) => {
    if (err) {
      console.error("Kesalahan saat mengambil data:", err);
      return res.status(500).json({ message: "Terjadi kesalahan server." });
    }
    if (results.length > 0) return res.json(results[0]);
    return res.status(404).json({ message: "Media tidak ditemukan." });
  });
});

// Endpoint POST - buat media baru
app.post("/media", (req, res) => {
  const { judul, tahun_rilis, genre } = req.body;
  if (!judul || !tahun_rilis || !genre) {
    return res
      .status(400)
      .json({ message: "Field judul, tahun_rilis, dan genre wajib diisi." });
  }

  const query =
    "INSERT INTO media (judul, tahun_rilis, genre) VALUES (?, ?, ?)";
  pool.query(query, [judul, tahun_rilis, genre], (err, result) => {
    if (err) {
      console.error("Kesalahan saat menambahkan data:", err);
      return res.status(500).json({ message: "Terjadi kesalahan server." });
    }
    const insertedId = result.insertId;
    res.status(201).json({ id_media: insertedId, judul, tahun_rilis, genre });
  });
});

// Endpoint DELETE - hapus media
app.delete("/media/:id_media", (req, res) => {
  const { id_media } = req.params;
  const query = "DELETE FROM media WHERE id_media = ?";
  pool.query(query, [id_media], (err, result) => {
    if (err) {
      console.error("Kesalahan saat menghapus data:", err);
      return res.status(500).json({ message: "Terjadi kesalahan server." });
    }
    if (result.affectedRows > 0) {
      return res.json({ message: "Media berhasil dihapus." });
    }
    return res.status(404).json({ message: "Media tidak ditemukan." });
  });
});

// Jalankan server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
