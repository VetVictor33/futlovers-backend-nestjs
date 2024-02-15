import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';

import { AppModule } from "./../src/app.module";
import { PrismaService } from "./../src/prisma/prisma.service";

import { playersList } from "./mocks/players-mocks";
import { PrismaServiceMock } from "./mocks/prisma-mock";

describe('PlayerController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async() => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule]})
    .overrideProvider(PrismaService).useValue(PrismaServiceMock)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/players (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/players')
    
    expect(response.statusCode).toEqual(200)
    expect(response.body).toStrictEqual(playersList)
  
  });
})