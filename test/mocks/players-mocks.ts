import { Player } from "@prisma/client";

export const singlePlayer: Player = {
    id: 'player-321', name: 'Single Player', age: 33, team_id: 'team_321', created_at: '2024-02-15T13:33:50.616Z' as unknown as Date,  updated_at: '2024-02-15T13:33:50.616Z' as unknown as Date
}

export const playersList: Player[] = [
    { id: 'player-1', name: 'Player 1', age: 20, team_id: 'team_1', created_at: '2024-02-15T13:33:50.616Z' as unknown as Date,  updated_at: '2024-02-15T13:33:50.616Z' as unknown as Date},
    { id: 'player-2', name: 'Player 2', age: 21, team_id: 'team_1', created_at: '2024-02-15T13:33:50.616Z' as unknown as Date,  updated_at: '2024-02-15T13:33:50.616Z' as unknown as Date },
    { id: 'player-3', name: 'Player 3', age: 22, team_id: 'team_2', created_at: '2024-02-15T13:33:50.616Z' as unknown as Date,  updated_at: '2024-02-15T13:33:50.616Z' as unknown as Date },
    { id: 'player-4', name: 'Player 4', age: 23, team_id: 'team_2', created_at: '2024-02-15T13:33:50.616Z' as unknown as Date,  updated_at: '2024-02-15T13:33:50.616Z' as unknown as Date },
];