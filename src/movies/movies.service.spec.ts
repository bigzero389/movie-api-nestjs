import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MoviesService,
        { provide: getRepositoryToken(Movie), useClass: Repository },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined(서비스가 정의되어 있는지 체크)', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array(배열이 리턴되어야 함)', () => {
      service
        .getAll()
        .then((result) => expect(result).toBeInstanceOf(Array))
        .catch((err) => {
          console.error(err);
        });
    });
  });

  describe('getOne', () => {
    it('should return a movie(한개의 movie 객체 리턴.)', () => {
      service
        .create({ title: 'jest test movie', year: 2021 })
        .then(() => service.getOne(1))
        .then((result) => expect(result.id).toBe(1))
        .catch((err) => { console.error(err); });
    });

    it('should throw NotFoundException error(NotFoundException 이 throw 되어야 함.)', () => {
      const testId = 99999;
      service
        .getOne(testId)
        .then((result) => expect(result).toBeInstanceOf(NotFoundException));
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie(한개의 movie 를 지움)', () => {
      try {
        service
          .create({ title: 'Test Movie', year: 2000 })
          .then(() => service.deleteOne(1))
          .then((deleteResult) => expect(deleteResult).toBe(1));
      } catch (err) {
        console.log(err);
      }
    });

    it('should throw NotFoundException error(NotFoundException 이 throw 되어야 함.) ', () => {
      const testId = 99999999;
      try {
        service
          .deleteOne(testId)
          .then((err) => expect(err).toBeInstanceOf(NotFoundException));
      } catch (err) {
        console.log(err);
      }
    });
  });

  describe('isDeleteOne', () => {
    it('should return false(없는 데이터를 지우면 false 리턴', () => {
      try {
        service
          .create({ title: 'Test Movie', year: 2000 })
          .then(() => service.isDeleteOne(100))
          .then((isDeleted) => expect(isDeleted).toBe(false));
      } catch (err) {
        console.log(err);
      }
    });
  });

  describe('create', () => {
    it('should create a movie(create 이후 결과값을 movie 객체로 리턴)', () => {
      const insertData = { title: 'created movie', year: 1999 };
        service
          .create(insertData)
          .then((createdMovie) => expect(createdMovie).toEqual(insertData))
          .catch((err) => { console.error(err); })

    });
  });

  describe('isCreate', () => {
    it('should create a movie and return true or false(create 이후 처리결과를 boolean 으로 리턴)', () => {
      const insertData = { title: 'created movie', year: 1999 };
      service
        .isCreate(insertData)
        .then((isCreated) => expect(isCreated).toBe(true));
    });
  });

  describe('update', () => {
    it('should update a movie(update 이후 결과값을 movie 객체로 리턴)', () => {
      const updateTestTitle = 'Update Test Movie';
      try {
        service
          .create({ title: updateTestTitle, year: 2000 })
          .then((movie) => service.update(movie.id, { title: updateTestTitle }))
          .then((updatedMovie) =>
            expect(updatedMovie.title).toEqual(updateTestTitle),
          );
      } catch (err) {
        // console.log(err);
      }
    });

    it('should throw a NotFoundException(없는 데이터를 update 하면 NotFoundException 리턴)', async () => {
      const testId = 99999999;
      try {
        service
          .update(testId, {})
          .then((err) => expect(err).toBeInstanceOf(NotFoundException));
      } catch (err) {
        // console.log(err);
      }
    });
  });

  describe('isUpdate', () => {
    it('should update a movie and return true or false(update 이후 처리결과를 boolean 으로 리턴)', () => {
      const updateTestTitle = 'Update Test Movie';
      service
        .create({ title: updateTestTitle, year: 2000 })
        .then((movie) => service.update(movie.id, { title: updateTestTitle }))
        .then((isUpdated) => expect(isUpdated).toBe(true));
    });

    it('should return false(없는 데이터를 update 하면 false 리턴)', async () => {
      const testId = 99999999;
      service
        .isUpdate(testId, {})
        .then((isUpdated) => expect(isUpdated).toBe(false));
    });
  });
});
