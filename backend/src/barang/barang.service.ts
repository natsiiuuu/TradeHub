import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Barang, Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBarangDto } from './dto/create-barang.dto';
import { UpdateBarangDto } from './dto/update-barang.dto';

@Injectable()
export class BarangService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBarangDto): Promise<Barang> {
    const penjual = dto.penjual ?? 'Fattan';
    const kembar = await this.prisma.barang.findFirst({
      where: { nama: { equals: dto.nama, mode: 'insensitive' }, penjual },
    });
    if (kembar) {
      throw new ConflictException(
        `Barang "${dto.nama}" sudah pernah diposting oleh ${penjual}`,
      );
    }
    return this.prisma.barang.create({ data: { ...dto, penjual } });
  }

  async findAll(): Promise<Barang[]> {
    return this.prisma.barang.findMany({ orderBy: { tanggalPosting: 'desc' } });
  }

  async findOne(id: string): Promise<Barang> {
    const barang = await this.prisma.barang.findUnique({ where: { id } });
    if (!barang) {
      throw new NotFoundException(`Barang dengan id ${id} tidak ditemukan`);
    }
    return barang;
  }

  async update(id: string, dto: UpdateBarangDto): Promise<Barang> {
    try {
      return await this.prisma.barang.update({ where: { id }, data: dto });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Barang dengan id ${id} tidak ditemukan`);
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.barang.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Barang dengan id ${id} tidak ditemukan`);
      }
      throw error;
    }
  }

  // Tahap 10 (opsional): statistik sederhana
  async statistik() {
    const [total, perStatus, harga] = await Promise.all([
      this.prisma.barang.count(),
      this.prisma.barang.groupBy({ by: ['status'], _count: { _all: true } }),
      this.prisma.barang.aggregate({
        _avg: { harga: true },
        _min: { harga: true },
        _max: { harga: true },
      }),
    ]);
    return {
      total,
      perStatus: perStatus.map((s) => ({
        status: s.status,
        jumlah: s._count._all,
      })),
      harga: {
        rataRata: Math.round(harga._avg.harga ?? 0),
        termurah: harga._min.harga,
        termahal: harga._max.harga,
      },
    };
  }
}