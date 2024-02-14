import { Injectable } from '@nestjs/common';
import { PlayerRepository } from '../repositories/player.repository';
import { Player, Prisma } from '@prisma/client';

@Injectable()
export class PlayerService {
    constructor(
        private playerRepository: PlayerRepository
    ){}

    async create(team_id: string, data: Prisma.PlayerUncheckedCreateInput): Promise<Player> {
        const player = await this.playerRepository.create({
            name: data.name,
            age: data.age,
            team_id
        })
        return player
    }

    async findById(id: string): Promise<Player | null> {
        const player = await this.playerRepository.findById(id)
        return player
    }

    async findAll(): Promise<Player[]> {
        const players = await this.playerRepository.findAll()
        return players
    }

    async update(id: string, data: Partial<Player>): Promise<Player | null> {
        const updatedPlayer = await this.playerRepository.update(id, {
            name: data.name,
            age: data.age,
            team_id: data.team_id
        })
        return updatedPlayer
    }

    async delete(id: string): Promise<void> {
        await this.playerRepository.delete(id)
    }
}
