import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { INestApplication, HttpStatus } from '@nestjs/common';

class MessagesRepositoryMock {

  message1= {
    id: '1',
    author: {
      id: '1',
      userName: 'author1'
    },
    topic: {
      id: '11',
      label: 'topic11'
    },
    content: 'content1',
    createdAt: new Date("2019-10-22T15:32:42.059Z"),
    updatedAt: new Date("2019-10-22T15:32:42.059Z"),
    deletedAt: null
  };

  message2= {
    id: '2',
    author: {
      id: '2',
      userName: 'author2'
    },
    topic: {
      id: '10',
      label: 'topic10'
    },
    content: 'content2',
    createdAt: new Date("2019-10-22T15:32:42.059Z"),
    updatedAt: new Date("2019-10-22T15:32:42.059Z"),
    deletedAt: null
  };
  messagesMap = {
    10: [this.message2],
    11: [this.message1]
  }
  messages = [this.message1, this.message2];

  async findAll(params): Promise<any> {
    const topicParamIndex = 1;
    if(params.include[1].where){
      const messages = this.messagesMap[params.include[topicParamIndex].where.id];
      return messages ? messages : [];
    } else {
      return this.messages;
    }
  }
}

describe('MessagesController', () => {
  let app: INestApplication;
  let messagesRepositoryMock: MessagesRepositoryMock =  new MessagesRepositoryMock();

  beforeAll(async () => {
    const mockAppModule: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers:[MessagesService, { 
        provide: 'MessagesRepository',
        useValue: messagesRepositoryMock
      }]
    }).compile();

    app = mockAppModule.createNestApplication();
    await app.init();
  });

  describe('get /api/messages', () => {
    it('should return an array of messages', async () => {
      const expected = [{
          "id": "1",
          "author": "author1",
          "content": "content1",
          "createdAt": "2019-10-22T15:32:42.059Z",
          "topic": "topic11",
          "updatedAt": "2019-10-22T15:32:42.059Z",
        },{
          "id": "2",
          "author": "author2",
          "content": "content2",
          "createdAt": "2019-10-22T15:32:42.059Z",
          "topic": "topic10",
          "updatedAt": "2019-10-22T15:32:42.059Z",
        }];

      await request(app.getHttpServer())
        .get('/api/messages')
        .expect(HttpStatus.OK)
        .expect(res => {
          expect(res.body).toEqual(expected);
        });
    });
  });

  describe('get /api/messages/:id', () => {
    it('should return 200 when searching with a topic attributed to at least a message', async () => {
      const expected = [{
        "author": "author2", 
        "content": "content2", 
        "createdAt": "2019-10-22T15:32:42.059Z", 
        "id": "2", 
        "topic": "topic10", 
        "updatedAt": "2019-10-22T15:32:42.059Z"
      }];
      await request(app.getHttpServer())
        .get('/api/messages/10')
        .expect(HttpStatus.OK)
        .expect(res => {
            expect(res.body).toEqual(expected);
        });
    });

    it('should return 200 when searching with a topic attributed to no message', async () => {
      const expected = [];
      await request(app.getHttpServer())
        .get('/api/messages/5')
        .expect(HttpStatus.OK)
        .expect(res => {
            expect(res.body).toEqual([]);
        });
    });
  });

  afterAll(async done => {
    await app.close();
    done();
  });
});