import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/cities (GET)', () => {
    it('should return all cities', () => {
      return request(app.getHttpServer())
        .get('/cities')
        .expect(200)
        .expect([]);
    });
  });

  describe('/cities/search/:term (GET)', () => {
    it('should return cities that match the search term', () => {
      const searchTerm = 'test';
      return request(app.getHttpServer())
        .get(`/cities/search/${searchTerm}`)
        .expect(200)
        .expect([]);
    });
  });
});


