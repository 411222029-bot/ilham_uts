-- init_db.sql
-- Skrip untuk membuat database `media`, tabel `media`, dan data contoh

CREATE DATABASE IF NOT EXISTS `media` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `media`;

-- Tabel media
CREATE TABLE IF NOT EXISTS `media` (
  `id_media` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `judul` VARCHAR(255) NOT NULL,
  `tahun_rilis` INT NOT NULL,
  `genre` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_media`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data contoh
INSERT INTO `media` (`judul`, `tahun_rilis`, `genre`) VALUES
  ('Langit Merah', 2023, 'Drama'),
  ('Misteri Kota', 2021, 'Thriller'),
  ('Petualangan Si Kancil', 2024, 'Animasi');

-- Catatan:
-- 1) Jalankan skrip ini di MySQL client atau MySQL Workbench.
--    Contoh (PowerShell):
--      mysql -u root -p < init_db.sql
-- 2) Jika menggunakan user/host/password berbeda, sesuaikan perintah dan/atau
--    ubah kredensial saat login ke MySQL.
