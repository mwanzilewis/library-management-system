import { NestFactory } from '@nestjs/core';
import { Controller, Get, Post, Body, Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

@Controller()
class AppController {
  @Get()
  getHello() {
    return 'Hello World! Library is working!';
  }
}

@Controller('books')
class BooksController {
  constructor(private prisma: PrismaService) {}

  @Get()
  getBooks() {
    return this.prisma.book.findMany();
  }

  @Get('seed')
  async seed() {
    const genre = await this.prisma.genre.upsert({
      where: { name: 'Fiction' },
      update: {},
      create: { name: 'Fiction' },
    });
    return this.prisma.book.upsert({
      where: { isbn: '978-0435908385' },
      update: {},
      create: {
        title: 'The River Between',
        author: 'Ngugi wa Thiongo',
        isbn: '978-0435908385',
        publishedYr: 1965,
        genreId: genre.id,
      },
    });
  }

  @Post()
  async addBook(@Body() data: any) {
    const genre = await this.prisma.genre.upsert({
      where: { name: data.genre || 'Fiction' },
      update: {},
      create: { name: data.genre || 'Fiction' },
    });
    return this.prisma.book.create({
      data: {
        title: data.title,
        author: data.author,
        isbn: data.isbn,
        publishedYr: Number(data.publishedYr),
        genreId: genre.id,
      },
    });
  }
}

@Module({ imports: [PrismaModule], controllers: [AppController, BooksController] })
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
