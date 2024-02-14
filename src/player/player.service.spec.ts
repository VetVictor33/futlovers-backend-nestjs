import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { PrismaService } from '../prisma/prisma.service';
import { PlayerRepository } from '../repositories/player.repository';

describe('PlayerService', () => {
  let service: PlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerService, PlayerRepository ,PrismaService],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
