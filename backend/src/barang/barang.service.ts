import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Barang } from './entities/barang.entity';
import { CreateBarangDto } from './dto/create-barang.dto';
import { UpdateBarangDto } from './dto/update-barang.dto';

@Injectable()
export class BarangService {
  private barang: Barang[] = [
    {
      id: '1',
      nama: 'Kalkulator Casio FX-991ES Plus',
      kategori: 'Akademik',
      kondisi: 'Baik',
      harga: 80000,
      lokasi: 'Telkom University',
      status: 'Tersedia',
      negosiasi: true,
      deskripsi: 'Kalkulator dalam kondisi baik dan berfungsi normal. Ada sedikit goresan pada bagian luar akibat pemakaian.',
      gambar: '/images/kalkulator.jpg',
      penjual: 'Fattan',
      tanggalPosting: '2026-09-27T08:00:00.000Z',
    },
    {
      id: '2',
      nama: 'Headset Gaming',
      kategori: 'Elektronik',
      kondisi: 'Sangat Baik',
      harga: 150000,
      lokasi: 'Dayeuhkolot',
      status: 'Dipesan',
      negosiasi: false,
      deskripsi: 'Headset gaming lengkap dengan kotak dan kabel, suara masih jernih.',
      gambar: '/images/headset.jpg',
      penjual: 'Fattan',
      tanggalPosting: '2026-09-28T08:00:00.000Z',
    },
    {
      id: '3',
      nama: 'Jaket Hoodie',
      kategori: 'Fashion',
      kondisi: 'Baik',
      harga: 100000,
      lokasi: 'Buah Batu',
      status: 'Terjual',
      negosiasi: false,
      deskripsi: 'Jaket hoodie hitam ukuran L, bahan tebal dan nyaman.',
      gambar: '/images/jaket.jpg',
      penjual: 'Fattan',
      tanggalPosting: '2026-09-29T08:00:00.000Z',
    },
  ];

  create(dto: CreateBarangDto): Barang {
    const penjual = dto.penjual ?? 'Fattan';
    const kembar = this.barang.some(
      (b) =>
        b.nama.toLowerCase() === dto.nama.toLowerCase() &&
        b.penjual === penjual,
    );
    if (kembar) {
      throw new ConflictException(
        `Barang "${dto.nama}" sudah pernah diposting oleh ${penjual}`,
      );
    }

    const barangBaru: Barang = {
      id: randomUUID(),
      nama: dto.nama,
      kategori: dto.kategori,
      kondisi: dto.kondisi,
      harga: dto.harga,
      lokasi: dto.lokasi,
      status: dto.status ?? 'Tersedia',
      negosiasi: dto.negosiasi ?? false,
      deskripsi: dto.deskripsi ?? '',
      gambar: dto.gambar ?? '',
      penjual,
      tanggalPosting: new Date().toISOString(),
    };
    this.barang.unshift(barangBaru);
    return barangBaru;
  }

  findAll(): Barang[] {
    return this.barang;
  }

  findOne(id: string): Barang {
    const barang = this.barang.find((b) => b.id === id);
    if (!barang) {
      throw new NotFoundException(`Barang dengan id ${id} tidak ditemukan`);
    }
    return barang;
  }

  update(id: string, dto: UpdateBarangDto): Barang {
    const barang = this.findOne(id);
    Object.assign(barang, dto);
    return barang;
  }

  remove(id: string): void {
    const barang = this.findOne(id);
    this.barang = this.barang.filter((b) => b.id !== barang.id);
  }
}