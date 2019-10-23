import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';
import { INestApplication, HttpStatus } from '@nestjs/common';

class TopicsRepositoryMock {

  topic1= {
    id: '1',
    label: 'topic1',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null
  };
  topic2= {
    id: '2',
    label: 'topic2',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null
  };
  topicsMap = {
    1: this.topic1,
    2: this.topic2
  }
  topics = [this.topic1, this.topic2];

  async findAll(): Promise<any> {
      return this.topics;
  }

  async findByPk(id): Promise<any> {
    return this.topicsMap[id];
  }
}

describe('TopicsController', () => {
  let app: INestApplication;
  let topicsRepositoryMock: TopicsRepositoryMock =  new TopicsRepositoryMock();

  beforeAll(async () => {
    const mockAppModule: TestingModule = await Test.createTestingModule({
      controllers: [TopicsController],
      providers:[TopicsService, { 
        provide: 'TopicsRepository',
        useValue: topicsRepositoryMock
      }]
    }).compile();

    app = mockAppModule.createNestApplication();
    await app.init();
  });

  describe('get /api/topics', () => {
    it('should return an array of topics', async () => {
      const expected = [{
        "id": "1",
        "label": "topic1",
      },
      {
        "id": "2",
        "label": "topic2",
      }];
      await request(app.getHttpServer())
        .get('/api/topics')
        .expect(HttpStatus.OK)
        .expect(res => {
          expect(res.body).toEqual(expected);
        });
    });
  });

  describe('get /api/topics/:id', () => {
    it('should return 200 when searching an existing topic', async () => {
      const expected = {
        "id": "1",
        "label": "topic1",
      };
      await request(app.getHttpServer())
        .get('/api/topics/1')
        .expect(HttpStatus.OK)
        .expect(res => {
            expect(res.body).toEqual(expected);
        });
    });

    it('should return 404 when searching a non existing topic', async () => {
      await request(app.getHttpServer())
        .get('/api/topics/5')
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  afterAll(async done => {
    await app.close();
    done();
  });
});