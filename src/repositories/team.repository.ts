import { Injectable } from "@nestjs/common";
import { Prisma, Team } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { BaseRepository } from "../repositories/base.interface.repository";

@Injectable()
export class TeamRepository implements BaseRepository<Team> {
    constructor(
        private prisma: PrismaService
    ){}

    async create(data: Partial<Team>): Promise<Team> {
        const team = await this.prisma.team.create({data: {
            name: data.name, 
        }})
        return team
    }

    async findAll(): Promise<Team[]> {
        const teams = await this.prisma.team.findMany()
        return teams
    }

    async findById(id: string): Promise<Team | null> {
        const team = await this.prisma.team.findUnique({where: {id}})
        return team
    }

    async update(id: string, data: Prisma.TeamUncheckedUpdateInput): Promise<Team | null> {
        const updatedTeam = await this.prisma.team.update({where: {id}, data})
        return updatedTeam
    }

    async delete(id: string): Promise<void> {
        await this.prisma.team.delete({where: {id}})
    }
}