import { Injectable } from '@nestjs/common';
import { Prisma, Team } from '@prisma/client';
import { TeamRepository } from './team.repository';

@Injectable()
export class TeamService {
    constructor(
        private teamRepository: TeamRepository
    ){}

    async create(data: Prisma.TeamUncheckedCreateInput): Promise<Team> {
        const team = await this.teamRepository.create({
            name: data.name, 
        })
        return team
    }

    async findAll(): Promise<Team[]> {
        const teams = await this.teamRepository.findAll()
        return teams
    }

    async findById(id: string): Promise<Team | null> {
        const team = await this.teamRepository.findById(id)
        return team
    }

    async update(id: string, data: Partial<Team>): Promise<Team | null> {
        const updatedTeam = await this.teamRepository.update(id, {name: data.name})
        return updatedTeam
    }

    async delete(id: string): Promise<void> {
        await this.teamRepository.delete(id)
    }
}
