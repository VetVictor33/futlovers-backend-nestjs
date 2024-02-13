import { Module } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { PrismaService } from 'src/prisma.service';
import { PlayerRepository } from './player.repository';

@Module({
  providers: [PlayerService, PrismaService, PlayerRepository],
  controllers: [PlayerController]
})
export class PlayerModule implements Prisma.PlayerCreateInput{
    age: number;
    team: Prisma.TeamCreateNestedOneWithoutPlayersInput;
    name: string
}
