import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { ErrorsMessage } from '../shared/error';

class TopicsServiceMock {
  async create(topic): Promise<any> {
    topic.id = 10
    return topic;
  }
}

describe('TopicsController', () => {
  let app: INestApplication;
  let topicsServiceMock: TopicsServiceMock =  new TopicsServiceMock();

  beforeAll(async () => {
    const mockAppModule: TestingModule = await Test.createTestingModule({
      controllers: [TopicsController],
      providers:[{ 
        provide: TopicsService,
        useValue: topicsServiceMock
      }]
    }).compile();

    app = mockAppModule.createNestApplication();
    await app.init();
  });

  describe('post /api/topics', () => {
    it('should return 400 when creating a topic with no label', async () => {
      const data = {};

      const expected = [{
        label : ErrorsMessage.EMPTY_OR_NULL
      }]

      await request(app.getHttpServer())
        .post('/api/topics')
        .send(data)
        .expect(HttpStatus.BAD_REQUEST)
        .expect(res => {
          expect(res.body.errors).toEqual(expected);
        });
    });

    it('should return 400 when creating a topic with empty label', async () => {
      const data = {
        "label": "",
      };

      const expected = [{
        label : ErrorsMessage.EMPTY_OR_NULL
      }]

      await request(app.getHttpServer())
        .post('/api/topics')
        .send(data)
        .expect(HttpStatus.BAD_REQUEST)
        .expect(res => {
          expect(res.body.errors).toEqual(expected);
        });
    });

    it('should return 201 when creating a topic with a label', async () => {
      const data = {
        label: "new topic",
      };
      const expected = {
        id: 10,
        label: "new topic",
      };

      await request(app.getHttpServer())
        .post('/api/topics')
        .send(data)
        .expect(HttpStatus.CREATED)
        .expect(res => {
          expect(res.body).toEqual(expected);
        });
    });
  });

  afterAll(async done => {
    await app.close();
    done();
  });
});