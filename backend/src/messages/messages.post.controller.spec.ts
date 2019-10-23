import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { ErrorsMessage } from '../shared/error';

class MessagesServiceMock {
  async create(message): Promise<any> {
    message.id = 15;
    return message;
  }
}

describe('MessagesController', () => {
  let app: INestApplication;
  let messagesServiceMock: MessagesServiceMock =  new MessagesServiceMock();

  beforeAll(async () => {
    const mockAppModule: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers:[{ 
        provide: MessagesService,
        useValue: messagesServiceMock
      }]
    }).compile();

    app = mockAppModule.createNestApplication();
    await app.init();
  });

  describe('post /api/messages', () => {
    it('should return 400 when creating a message with no attributes', async () => {
      const data = {};

      const expected = [{
          content: ErrorsMessage.EMPTY_OR_NULL
        },{
          authorId: ErrorsMessage.EMPTY_OR_NULL,
        },{
          topicId: ErrorsMessage.EMPTY_OR_NULL
        }]

      await request(app.getHttpServer())
        .post('/api/messages')
        .send(data)
        .expect(HttpStatus.BAD_REQUEST)
        .expect(res => {
          expect(res.body.errors).toEqual(expected);
        });
    });

    it('should return 400 when creating a message with no content', async () => {
      const data = {
        authorId: 1,
        topicId: 1
      };

      const expected = [{
        content: ErrorsMessage.EMPTY_OR_NULL
      }];

      await request(app.getHttpServer())
        .post('/api/messages')
        .send(data)
        .expect(HttpStatus.BAD_REQUEST)
        .expect(res => {
          expect(res.body.errors).toEqual(expected);
        });
    });

    it('should return 400 when creating a message with wrong content', async () => {
      const data = {
        content: "content",
        authorId: 1,
        topicId: 1
      };

      const expected = [{
        content: ErrorsMessage.MUST_START_WITH
      }];

      await request(app.getHttpServer())
        .post('/api/messages')
        .send(data)
        .expect(HttpStatus.BAD_REQUEST)
        .expect(res => {
          expect(res.body.errors).toEqual(expected);
        });
    });

    it('should return 400 when creating a message with no authorId', async () => {
      const data = {
        content: 'Bonjour tom, voici un contenu',
        topicId: 1
      };

      const expected = [{
        authorId: ErrorsMessage.EMPTY_OR_NULL
      }];

      await request(app.getHttpServer())
        .post('/api/messages')
        .send(data)
        .expect(HttpStatus.BAD_REQUEST)
        .expect(res => {
          expect(res.body.errors).toEqual(expected);
        });
    });

    it('should return 400 when creating a message with no topicId', async () => {
      const data = {
        content: 'Bonjour tom, voici un contenu',
        authorId: 1
      };

      const expected = [{
        topicId: ErrorsMessage.EMPTY_OR_NULL
      }];

      await request(app.getHttpServer())
        .post('/api/messages')
        .send(data)
        .expect(HttpStatus.BAD_REQUEST)
        .expect(res => {
          expect(res.body.errors).toEqual(expected);
        });
    });

    it('should return 201 when creating a message with a label', async () => {
      const data = {
        content: 'Bonjour tom, voici un contenu',
        topicId: 1,
        authorId: 1
      };
      const expected = {
        id: 15,
        content: 'Bonjour tom, voici un contenu',
        topicId: 1,
        authorId: 1
      };

      await request(app.getHttpServer())
        .post('/api/messages')
        .send(data)
        .expect(HttpStatus.CREATED)
        .expect(res => {
          expect(res.body).toEqual(expected)
        });
    });
  });

  afterAll(async done => {
    await app.close();
    done();
  });
});