import { Module } from '@nestjs/common';
import { PrismaService } from "prisma/prisma.service";
import { TeamController } from './team.controller';
import { TeamRepository } from "./team.repository";
import { TeamService } from './team.service';

@Module({
  providers: [TeamService, PrismaService, TeamRepository],
  controllers: [TeamController]
})
export class TeamModule {}