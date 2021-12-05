import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
// import { AppModule } from 'src/app.module';

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Movie])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
