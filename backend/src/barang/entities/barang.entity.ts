export type StatusBarang = 'Tersedia' | 'Dipesan' | 'Terjual';

export class Barang {
  id: string;
  nama: string;
  kategori: string;
  kondisi: string;
  harga: number;
  lokasi: string;
  status: StatusBarang;
  negosiasi: boolean;
  deskripsi: string;
  gambar: string;
  penjual: string;
  tanggalPosting: string;
}