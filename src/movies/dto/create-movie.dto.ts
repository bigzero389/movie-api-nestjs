import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  // @IsNumber()
  // id: number;

  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  // @IsOptional()
  // @IsString({ each: true })
  // readonly genres: string[];
}
