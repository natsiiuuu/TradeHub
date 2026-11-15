import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export const KATEGORI = [
  'Akademik',
  'Elektronik',
  'Fashion',
  'Peralatan Kos',
  'Olahraga',
  'Lainnya',
];
export const KONDISI = ['Seperti Baru', 'Sangat Baik', 'Baik', 'Cukup'];
export const STATUS = ['Tersedia', 'Dipesan', 'Terjual'];

export class CreateBarangDto {
  @IsString()
  @MinLength(3)
  nama: string;

  @IsIn(KATEGORI)
  kategori: string;

  @IsIn(KONDISI)
  kondisi: string;

  @IsInt()
  @Min(0)
  harga: number;

  @IsString()
  @IsNotEmpty()
  lokasi: string;

  @IsOptional()
  @IsIn(STATUS)
  status?: 'Tersedia' | 'Dipesan' | 'Terjual';

  @IsOptional()
  @IsBoolean()
  negosiasi?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  deskripsi?: string;

  @IsOptional()
  @IsString()
  gambar?: string;

  @IsOptional()
  @IsString()
  penjual?: string;
}