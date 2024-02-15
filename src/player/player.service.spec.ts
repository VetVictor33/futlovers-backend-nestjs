import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { PrismaService } from '../prisma/prisma.service';
import { PlayerRepository } from '../repositories/player.repository';
import { Player } from '@prisma/client';

interface PrismaServiceMock {
  player: {
    create: jest.MockedFn<any>;
    findMany: jest.MockedFn<any>;
    findUnique: jest.MockedFn<any>;
    update: jest.MockedFn<any>;
    delete: jest.MockedFn<any>;
  };
}

const prismaMock = {
    player: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
};

describe('PlayerService', () => {
  let service: PlayerService;
  let prismaService: PrismaServiceMock

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerService, PlayerRepository, {provide: PrismaService, useValue: prismaMock}],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
    prismaService = module.get<PrismaService>(PrismaService) as unknown as PrismaServiceMock;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a player', async () => {
    const team_id = 'team_id_123'
    const playerData: Partial<Player> = {
        name: 'Fulano',
        age: 25,
    };

    const createdPlayer: Partial<Player> = {
        id: 'player_id_123',
        name: 'Fulano',
        age: 25,
        team_id
    };

    prismaService.player.create.mockResolvedValue(createdPlayer)

    const result = await service.create(team_id, playerData);

    expect(result).toEqual(createdPlayer);
    expect(prismaService.player.create).toHaveBeenCalledWith({ data: {...playerData, team_id} });
  });

  it('should list a player by id', async () => {
    const playersList: Player[] = [
      { id: '1', name: 'Player 1', age: 20, team_id: 'team_1_id', created_at: new Date(),  updated_at: new Date()},
      { id: '2', name: 'Player 2', age: 22, team_id: 'team_2_id', created_at: new Date(),  updated_at: new Date() },
    ];
  
    prismaService.player.findUnique.mockResolvedValue(playersList[0])
  
    const result = await service.findById('1')
  
    expect(result).toBe(playersList[0])
    expect(prismaService.player.findUnique).toHaveBeenCalledWith({where: {id: '1'}})
  })
  
  it('should list all players', async () => {
    const playersList: Player[] = [
      { id: '1', name: 'Player 1', age: 20, team_id: 'team_1_id', created_at: new Date(),  updated_at: new Date()},
      { id: '2', name: 'Player 2', age: 22, team_id: 'team_2_id', created_at: new Date(),  updated_at: new Date() },
    ];
  
    prismaService.player.findMany.mockResolvedValue(playersList)
  
    const result = await service.findAll()
  
    expect(result).toBeInstanceOf(Array<Player>)
    expect(result).toBe(playersList)
    expect(prismaService.player.findMany).toHaveBeenCalled()
  })

  it('should update a player', async () => {
    const updatedPlayer: Partial<Player> = {
      name: 'New Name', age: 20, team_id: 'team_1_id'
    }

    prismaService.player.update.mockResolvedValue(updatedPlayer)

    const result = await service.update('1', updatedPlayer)

    expect(result).toBe(updatedPlayer)
    expect(prismaService.player.update).toHaveBeenCalledWith({where: {id: '1'}, data: {...updatedPlayer}})
    
  })

  it('should delete a player', async () => {
    const playerId = 'fake-id'
    await service.delete(playerId)

    expect(prismaService.player.delete).toHaveBeenCalledWith({where: {id: playerId}})
  })
});
