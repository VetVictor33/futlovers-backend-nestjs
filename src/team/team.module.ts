import { Prisma } from "@prisma/client"
import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { PrismaService } from "src/prisma.service";
import { TeamController } from './team.controller';

@Module({
  providers: [TeamService, PrismaService],
  controllers: [TeamController]
})
export class TeamModule implements Prisma.TeamCreateInput {
    name: string
    age: number
}