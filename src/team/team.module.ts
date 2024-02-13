import { Module } from '@nestjs/common';
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { TeamController } from './team.controller';
import { TeamRepository } from "./team.repository";
import { TeamService } from './team.service';

@Module({
  providers: [TeamService, PrismaService, TeamRepository],
  controllers: [TeamController]
})
export class TeamModule implements Prisma.TeamCreateInput {
    name: string
    age: number
}