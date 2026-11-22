-- CreateEnum
CREATE TYPE "StatusBarang" AS ENUM ('Tersedia', 'Dipesan', 'Terjual');

-- CreateTable
CREATE TABLE "barang" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "kondisi" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,
    "lokasi" TEXT NOT NULL,
    "status" "StatusBarang" NOT NULL DEFAULT 'Tersedia',
    "negosiasi" BOOLEAN NOT NULL DEFAULT false,
    "deskripsi" TEXT NOT NULL DEFAULT '',
    "gambar" TEXT NOT NULL DEFAULT '',
    "penjual" TEXT NOT NULL DEFAULT 'Fattan',
    "tanggalPosting" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "barang_pkey" PRIMARY KEY ("id")
);
