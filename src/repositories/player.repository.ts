import { Injectable } from "@nestjs/common";
import { Player, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { BaseRepository } from "../repositories/base.interface.repository";

@Injectable()
export class PlayerRepository implements BaseRepository<Player> {
    constructor(
        private prisma: PrismaService
    ){}

    async create(data: Partial<Player>): Promise<Player>{
        const player = await this.prisma.player.create({data: {
            name: data.name,
            age: data.age,
            team_id: data.team_id
        }})
        return player
    }

    async findAll(): Promise<Player[]> {
        const players = await this.prisma.player.findMany({
            include: {team: true}
        })
        return players
    }

    async findById(id: string): Promise<Player> {
        const players = await this.prisma.player.findUnique({where: {id}})
        return players
    }

    async update(id: string, data: Prisma.PlayerUncheckedUpdateInput): Promise<Player> {
        const updatedPlayer = await this.prisma.player.update({where: {id}, data: {
            name: data.name,
            age: data.age,
            team_id: data.team_id
        }})

        return updatedPlayer
    }

    async delete(id: string): Promise<void> {
        await this.prisma.player.delete({where:{id}})
    }
}