import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';

import { AppModule } from "./../src/app.module";
import { PrismaService } from "./../src/prisma/prisma.service";

import { PrismaServiceMock } from "./mocks/prisma-mock";
import { teamsList } from "./mocks/teams-mocks";

describe('TeamController (e2e)', () => {
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

  it('/teams (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/teams')
    
    expect(response.statusCode).toEqual(200)
    expect(response.body).toStrictEqual(teamsList)
  
  });
})