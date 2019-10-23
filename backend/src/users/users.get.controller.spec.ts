import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { INestApplication, HttpStatus } from '@nestjs/common';

class UsersRepositoryMock {

  user1= {
    id: '1',
    userName: 'user1',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null
  };
  user2= {
    id: '2',
    userName: 'user2',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null
  };
  usersMap = {
    1: this.user1,
    2: this.user2
  }
  users = [this.user1, this.user2];

  async findAll(): Promise<any> {
      return this.users;
  }

  async findByPk(id): Promise<any> {
    return this.usersMap[id];
  }
}

describe('UsersController', () => {
  let app: INestApplication;
  let usersRepositoryMock: UsersRepositoryMock =  new UsersRepositoryMock();

  beforeAll(async () => {
    const mockAppModule: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers:[UsersService, { 
        provide: 'UsersRepository',
        useValue: usersRepositoryMock
      }],
    }).compile();

    app = mockAppModule.createNestApplication();
    await app.init();
  });

  describe('get /api/users', () => {
    it('should return an array of users', async () => {
      const expected = [{
        "id": "1",
        "userName": "user1",
      },
      {
        "id": "2",
        "userName": "user2",
      }];
      await request(app.getHttpServer())
        .get('/api/users')
        .expect(HttpStatus.OK)
        .expect(res => {
          expect(res.body).toEqual(expected);
        });
    });
  });

  describe('get /api/users/:id', () => {
    it('should return 200 when searching an existing user', async () => {
      const expected = {
        "id": "1",
        "userName": "user1",
      };
      await request(app.getHttpServer())
        .get('/api/users/1')
        .expect(HttpStatus.OK)
        .expect(res => {
            expect(res.body).toEqual(expected);
        });
    });

    it('should return 404 when searching a non existing user', async () => {
      await request(app.getHttpServer())
        .get('/api/users/5')
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  afterAll(async done => {
    await app.close();
    done();
  });
});