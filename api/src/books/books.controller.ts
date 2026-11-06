import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('LIBRARIAN')
  create(@Body() dto: CreateBookDto) { return this.booksService.create(dto); }
  @Get()
  findAll(@Query() query: { genreId?: string; search?: string; page?: string; limit?: string }) {
    const { genreId, search, page, limit } = query;
    return this.booksService.findAll({ genreId, search, page, limit });
  }
  @Get(':id')
  findOne(@Param('id') id: string) { return this.booksService.findOne(+id); }
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('LIBRARIAN')
  update(@Param('id') id: string, @Body() dto: UpdateBookDto) { return this.booksService.update(+id, dto); }
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('LIBRARIAN')
  remove(@Param('id') id: string) { return this.booksService.remove(+id); }
}
