import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TeamService } from './team.service';
import { Prisma, Team } from '@prisma/client';

@Controller('teams')
export class TeamController {
    constructor(
        private readonly teamService: TeamService
    ){}

    @Post()
    async postTeam(@Body() data: Prisma.TeamUncheckedCreateInput): Promise<Team> {
        return await this.teamService.create(data)
    }

    @Get()
    async getTeams(): Promise<Team[]> {
        return await this.teamService.findAll()
    }

    @Get(':id')
    async getTeam(@Param('id') id:string): Promise<Team | null> {
        return await this.teamService.findById(id)
    }

    @Put(':id')
    async putTeam(@Param('id') id:string, @Body() data: Prisma.TeamUncheckedCreateInput): Promise<Team | null> {
        return await this.teamService.update(id, data)
    }

    @Delete(':id')
    async deleteTeam(@Param('id') id:string): Promise<void> {
        await this.teamService.delete(id)
    }
}
