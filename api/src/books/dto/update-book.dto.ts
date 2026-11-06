import { IsString, IsOptional, IsInt, Min } from 'class-validator';
export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title?: string;
  @IsString()
  @IsOptional()
  author?: string;
  @IsString()
  @IsOptional()
  isbn?: string;
  @IsInt()
  @Min(1)
  @IsOptional()
  totalCopies?: number;
  @IsInt()
  @IsOptional()
  genreId?: number;
}
