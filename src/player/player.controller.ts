import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { Player } from '@prisma/client';

import { CreatePlayerDto, FindOneParams, UpdatePlayerDto } from './player-dto';
import { PlayerService } from './player.service';

@Controller('players')
export class PlayerController {
    constructor (
        private readonly playerService: PlayerService
    ){}

    @Post(':id')
    async postPlayer(@Param() params: FindOneParams, @Body() data: CreatePlayerDto): Promise<Player>{
        return await this.playerService.create(params.id, data)
    }

    @Get()
    async getPlayers(): Promise<Player[]> {
        return await this.playerService.findAll()
    }

    @Get(':id')
    async getPlayer(@Param() params: FindOneParams): Promise<Player | null> {
        return await this.playerService.findById(params.id)
    }

    @Put(':id')
    async putTeam(@Param() params: FindOneParams, @Body() data: UpdatePlayerDto): Promise<Player | null> {
        return await this.playerService.update(params.id, data)
    }

    @Delete(':id')
    async deleteTeam(@Param() params: FindOneParams): Promise<void> {
        await this.playerService.delete(params.id)
    }
}
