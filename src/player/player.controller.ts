import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from '@prisma/client';

@Controller('players')
export class PlayerController {
    constructor (
        private readonly playerService: PlayerService
    ){}

    @Post(':id')
    async postPlayer(@Param('id') id:string, @Body() data: Player): Promise<Player>{
        try {
            return await this.playerService.create(id, data)
        } catch (error) {
            const message = 'Erro ao criar jogador. Certifique-se de fornecer os campos "name", "age" e que o id do time é válido'
            throw new HttpException(message, HttpStatus.BAD_REQUEST)
        }
    }

    @Get()
    async getPlayers(): Promise<Player[]> {
        return await this.playerService.findAll()
    }

    @Get(':id')
    async getPlayer(@Param('id') id:string): Promise<Player | null> {
        try {
            return await this.playerService.findById(id)
        } catch (error) {
            throw new HttpException(`Erro ao buscar por id`, HttpStatus.BAD_REQUEST)
        }
    }

    @Put(':id')
    async putTeam(@Param('id') id:string, @Body() data: Partial<Player>): Promise<Player | null> {
        try {
            return await this.playerService.update(id, data)
        } catch (error) {
            console.log(error)
            throw new HttpException(`Erro ao atualizar o jogador, certifique-se de id é válido`, HttpStatus.BAD_REQUEST)
        }
    }

    @Delete(':id')
    async deleteTeam(@Param('id') id:string): Promise<void> {
        try {
            await this.playerService.delete(id)
        } catch (error) {
            throw new HttpException(`Erro ao deletar o jogador, certifique-se de id é válido`, HttpStatus.BAD_REQUEST)
        }
    }
}
