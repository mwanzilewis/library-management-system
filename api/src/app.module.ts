import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { BooksModule } from './books/books.module';
import { GenresModule } from './genres/genres.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
@Module({ imports: [PrismaModule, BooksModule, GenresModule, AuthModule, UsersModule] })
export class AppModule {}
