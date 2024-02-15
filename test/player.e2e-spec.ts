import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';

import { AppModule } from "./../src/app.module";
import { PrismaService } from "./../src/prisma/prisma.service";

import { playersList, singlePlayer } from "./mocks/players-mocks";
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

  it('/players/:teamId (POST)', async () => {
    const response = await request(app.getHttpServer())
    .post(`/players/${singlePlayer.team_id}`).send({name: singlePlayer.name, age: singlePlayer.age})
    
    expect(response.statusCode).toEqual(201)
    expect(response.body).toStrictEqual(singlePlayer)
  });
  
  it('/players (GET)', async () => {
    const response = await request(app.getHttpServer())
    .get('/players')
    
    expect(response.statusCode).toEqual(200)
    expect(response.body).toStrictEqual(playersList)
  });

  it('players/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
    .get(`/players/${singlePlayer.id}`)
    
      expect(response.statusCode).toEqual(200)
      expect(response.body).toStrictEqual(singlePlayer)
  })
  
  
  it('/players/:id (PUT)', async () => {
    const response = await request(app.getHttpServer())
    .put(`/players/${singlePlayer.id}`).send({name: singlePlayer.name, age: singlePlayer.age, team_id: singlePlayer.team_id})
    
    expect(response.statusCode).toEqual(200)
    expect(response.body).toStrictEqual(singlePlayer)
  })

  it('/players/:id (DELETE)', async () => {
    const response = await request(app.getHttpServer())
    .delete(`/players/${singlePlayer.id}`)

    expect(response.statusCode).toEqual(200)
  })
})