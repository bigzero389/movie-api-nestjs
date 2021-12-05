import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

export class Util {
  static emptyPromise(val = null) {
    return new Promise((resolve) => {
      resolve(val);
    });
  }
}

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async getAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async getOne(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne(id);
    if (!movie) {
      throw new NotFoundException(`No movie in ${id}`);
    }
    return movie;
  }

  async deleteOne(id: number): Promise<DeleteResult> {
    const deleteResult = await this.movieRepository.delete(id);
    if (!deleteResult) {
      throw new NotFoundException(`No movie in ${id}`);
    }
    return deleteResult;
  }

  async isDeleteOne(id: number): Promise<boolean> {
    const deleteResult = await this.movieRepository.delete(id);
    return !!deleteResult;
  }

  async create(movieData: CreateMovieDto): Promise<Movie> {
    // console.log('created movieData: ' + JSON.stringify(movieData));
    const maxId = await this.getAll().then((movies) => movies.length);
    const createdMovie = await this.movieRepository.save({
      id: maxId + 1,
      ...movieData,
    });
    return createdMovie;
  }

  async isCreate(movieData: CreateMovieDto): Promise<boolean> {
    // console.log('created movieData: ' + JSON.stringify(movieData));
    const maxId = await this.getAll().then((movies) => movies.length);
    const createdMovie = await this.movieRepository.save({
      id: maxId + 1,
      ...movieData,
    });
    return !!createdMovie;
  }

  async update(id: number, updateData: UpdateMovieDto): Promise<Movie> {
    // console.log('updated movieData: ' + JSON.stringify(updateData));
    const movie = await this.getOne(id);
    if (!movie) {
      throw new NotFoundException(`ID: ${id} is not found`);
    }

    try {
      return await this.movieRepository.save({
        ...movie,
        ...updateData,
      });
    } catch (err) {
      console.log('update error: ' + err);
      return null;
    }
  }

  async isUpdate(id: number, updateData: UpdateMovieDto): Promise<boolean> {
    // console.log('updated movieData: ' + JSON.stringify(updateData));
    const movie = await this.getOne(id);
    const updateMovie = await this.movieRepository.save({
      ...movie,
      ...updateData,
    });
    return !!updateMovie;
  }
}
