import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { PrismaService } from '../prisma/prisma.service';
import { PlayerRepository } from '../repositories/player.repository';
import { Player } from '@prisma/client';
import { IPrismaServiceMock, PrismaServiceMock } from '../../test/mocks/prisma-mock';
import { playersList, singlePlayer } from '../../test/mocks/players-mocks';

describe('PlayerService', () => {
  let service: PlayerService;
  let prismaService: IPrismaServiceMock

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerService, PlayerRepository, {provide: PrismaService, useValue: PrismaServiceMock}],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
    prismaService = module.get<PrismaService>(PrismaService) as unknown as IPrismaServiceMock;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a player', async () => {
    const result = await service.create(singlePlayer.team_id, {name: singlePlayer.name, age: singlePlayer.age});

    expect(result).toEqual(singlePlayer);
    expect(prismaService.player.create).toHaveBeenCalledWith({ data: {name: singlePlayer.name, age: singlePlayer.age, team_id: singlePlayer.team_id} });
  });

  it('should list a player by id', async () => {
    const result = await service.findById(singlePlayer.id)
  
    expect(result).toBe(singlePlayer)
    expect(prismaService.player.findUnique).toHaveBeenCalledWith({where: {id: singlePlayer.id}})
  })
  
  it('should list all players', async () => {
    const result = await service.findAll()
  
    expect(result).toBeInstanceOf(Array<Player>)
    expect(result).toBe(playersList)
    expect(prismaService.player.findMany).toHaveBeenCalled()
  })

  it('should update a player', async () => {
    const result = await service.update(singlePlayer.id, {name: singlePlayer.name, age: singlePlayer.age, team_id: singlePlayer.team_id})

    expect(result).toStrictEqual(singlePlayer)
    expect(prismaService.player.update).toHaveBeenCalledWith(
      {where: {id: singlePlayer.id}, data: {name: singlePlayer.name, age: singlePlayer.age, team_id: singlePlayer.team_id}
    })
    
  })

  it('should delete a player', async () => {
    const playerId = 'fake-id'
    await service.delete(playerId)

    expect(prismaService.player.delete).toHaveBeenCalledWith({where: {id: playerId}})
  })
});
