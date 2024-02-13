import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PlayerController } from './player.controller';
import { PlayerRepository } from './player.repository';
import { PlayerService } from './player.service';

@Module({
  providers: [PlayerService, PrismaService, PlayerRepository],
  controllers: [PlayerController]
})
export class PlayerModule {}
