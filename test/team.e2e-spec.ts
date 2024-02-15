import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';

import { AppModule } from "./../src/app.module";
import { PrismaService } from "./../src/prisma/prisma.service";

import { PrismaServiceMock } from "./mocks/prisma-mock";
import { singleTeam, teamsList } from "./mocks/teams-mocks";

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

  it('/teams (POST)', async () => {
    const response = await request(app.getHttpServer())
    .post(`/teams`).send({name: singleTeam.name})
    
    expect(response.statusCode).toEqual(201)
    expect(response.body).toStrictEqual(singleTeam)
  });

  it('/teams (GET)', async () => {
    const response = await request(app.getHttpServer())
    .get('/teams')
    
    expect(response.statusCode).toEqual(200)
    expect(response.body).toStrictEqual(teamsList)
  });

  it('/teams/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
    .get(`/teams/${singleTeam.id}`)
    
      expect(response.statusCode).toEqual(200)
      expect(response.body).toStrictEqual(singleTeam)
  })
  
  it('/teams/:id (PUT)', async () => {
    const response = await request(app.getHttpServer())
    .put(`/teams/${singleTeam.id}`).send({name: singleTeam.name})
    
    expect(response.statusCode).toEqual(200)
    expect(response.body).toStrictEqual(singleTeam)
  })

  it('/teams/:id (DELETE)', async () => {
    const response = await request(app.getHttpServer())
    .delete(`/teams/${singleTeam.id}`)

    expect(response.statusCode).toEqual(200)
  })
})