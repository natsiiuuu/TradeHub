import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BarangService } from './barang.service';
import { CreateBarangDto } from './dto/create-barang.dto';
import { UpdateBarangDto } from './dto/update-barang.dto';

@Controller('barang')
export class BarangController {
  constructor(private readonly barangService: BarangService) {}

  @Post()
  create(@Body() dto: CreateBarangDto) {
    return this.barangService.create(dto);
  }

  @Get()
  findAll() {
    return this.barangService.findAll();
  }

  // Harus di atas ':id', kalau tidak "statistik" dianggap sebagai id
  @Get('statistik')
  statistik() {
    return this.barangService.statistik();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.barangService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBarangDto) {
    return this.barangService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.barangService.remove(id);
  }
}