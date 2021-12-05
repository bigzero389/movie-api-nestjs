// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Body, Patch, Query, Res } from '@nestjs/common';
import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import { map } from 'rxjs/operators';
import { from, Observable } from 'rxjs';

@Controller('movies')
export class MoviesController {
  constructor(readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Observable<Movie[]> {
    const movieList = from(this.moviesService.getAll());
    return movieList.pipe(
      map((movies) => {
        console.log(movies);
        return movies;
      }),
    );
  }

  @Get(':id')
  getOne(@Param('id') movieId: number): Observable<Movie> {
    console.log(typeof movieId);
    return from(this.moviesService.getOne(movieId));
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    console.log(movieData);
    this.moviesService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') movieId: number) {
    this.moviesService.deleteOne(movieId);
  }

  @Patch('/:id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    // console.log('controller updateData: ' + JSON.stringify(updateData));
    this.moviesService.update(movieId, updateData);
  }
}
