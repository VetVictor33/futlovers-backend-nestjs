import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamRepository } from "../repositories/team.repository";
import { TeamService } from './team.service';

@Module({
  providers: [TeamService, TeamRepository],
  controllers: [TeamController]
})
export class TeamModule {}