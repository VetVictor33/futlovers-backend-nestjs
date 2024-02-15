import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Team } from '@prisma/client';

import { CreateUpdateTeamDto, FindOneParams } from './team-dto';
import { TeamService } from './team.service';

@Controller('teams')
export class TeamController {
    constructor(
        private readonly teamService: TeamService
    ){}

    @Post()
    async postTeam(@Body() data: CreateUpdateTeamDto): Promise<Team> {
        return await this.teamService.create(data)
    }

    @Get()
    async getTeams(): Promise<Team[]> {
        return await this.teamService.findAll()
    }

    @Get(':id')
    async getTeam(@Param() params: FindOneParams): Promise<Team | null> {
        return await this.teamService.findById(params.id)
    }

    @Put(':id')
    async putTeam(@Param() params: FindOneParams, @Body() data: CreateUpdateTeamDto): Promise<Team | null> {
       return await this.teamService.update(params.id, data)
    }

    @Delete(':id')
    async deleteTeam(@Param() params: FindOneParams): Promise<void> {
        await this.teamService.delete(params.id)
    }
}
