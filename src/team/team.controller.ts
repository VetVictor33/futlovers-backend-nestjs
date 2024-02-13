import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Team } from '@prisma/client';

import { TeamService } from './team.service';

@Controller('teams')
export class TeamController {
    constructor(
        private readonly teamService: TeamService
    ){}

    @Post()
    async postTeam(@Body() data: Team): Promise<Team> {
        try {
            return await this.teamService.create({name:data.name})
        } catch (error) {
            throw new HttpException('Erro ao criar o time, por favor forneça o "name"', HttpStatus.BAD_REQUEST)
        }
    }

    @Get()
    async getTeams(): Promise<Team[]> {
        return await this.teamService.findAll()
    }

    @Get(':id')
    async getTeam(@Param('id') id:string): Promise<Team | null> {
        try {
            return await this.teamService.findById(id)
        } catch (error) {
            throw new HttpException(`Erro ao buscar por id`, HttpStatus.BAD_REQUEST)
        }
    }

    @Put(':id')
    async putTeam(@Param('id') id:string, @Body() data: Partial<Team>): Promise<Team | null> {
        try {
            return await this.teamService.update(id, data)
        } catch (error) {
            throw new HttpException(`Erro ao atualizar o time, certifique-se de id é válido`, HttpStatus.BAD_REQUEST)
        }
    }

    @Delete(':id')
    async deleteTeam(@Param('id') id:string): Promise<void> {
        try {
            await this.teamService.delete(id)
        } catch (error) {
            throw new HttpException(`Erro ao deletar o time, certifique-se de id é válido`, HttpStatus.BAD_REQUEST)
        }
    }
}
