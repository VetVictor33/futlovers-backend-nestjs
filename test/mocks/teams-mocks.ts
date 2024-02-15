import { Team } from "@prisma/client";

export const singleTeam: Team = {
    id: 'team-321', name: 'Single Team', created_at: '2024-02-15T13:33:50.616Z' as unknown as Date, updated_at: '2024-02-15T13:33:50.616Z' as unknown as Date
}

export const teamsList: Team[] = [
    {id: 'team-1', name: 'Team 1', created_at: '2024-02-15T13:33:50.616Z' as unknown as Date, updated_at: '2024-02-15T13:33:50.616Z' as unknown as Date},
    {id: 'team-2', name: 'Team 2', created_at: '2024-02-15T13:33:50.616Z' as unknown as Date, updated_at: '2024-02-15T13:33:50.616Z' as unknown as Date},
    {id: 'team-3', name: 'Team 3', created_at: '2024-02-15T13:33:50.616Z' as unknown as Date, updated_at: '2024-02-15T13:33:50.616Z' as unknown as Date},
    {id: 'team-4', name: 'Team 4', created_at: '2024-02-15T13:33:50.616Z' as unknown as Date, updated_at: '2024-02-15T13:33:50.616Z' as unknown as Date},
]