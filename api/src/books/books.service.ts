import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}
  create(dto: CreateBookDto) { return this.prisma.book.create({ data: dto }); }
  findAll(query: { genreId?: string; search?: string; page?: string; limit?: string }) {
    const genreId = query.genreId ? parseInt(query.genreId) : undefined;
    const search = query.search;
    const page = parseInt(query.page || '1');
    const limit = parseInt(query.limit || '10');
    const skip = (page - 1) * limit;
    const take = limit;
    const where: any = {};
    if (genreId) where.genreId = genreId;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { author: { contains: search, mode: 'insensitive' } },
      ];
    }
    return this.prisma.book.findMany({ where, skip, take, include: { genre: true } });
  }
  findOne(id: number) { return this.prisma.book.findUnique({ where: { id }, include: { genre: true } }); }
  update(id: number, dto: UpdateBookDto) { return this.prisma.book.update({ where: { id }, data: dto }); }
  remove(id: number) { return this.prisma.book.delete({ where: { id } }); }
}
