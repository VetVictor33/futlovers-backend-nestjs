import { playersList, singlePlayer } from "./players-mocks"
import { singleTeam, teamsList } from "./teams-mocks"

export interface IPrismaServiceMock {
    player: {
      create: jest.MockedFn<any>
      findMany: jest.MockedFn<any>
      findUnique: jest.MockedFn<any>
      update: jest.MockedFn<any>
      delete: jest.MockedFn<any>
    },
    team: {
      create: jest.MockedFn<any>
      findMany: jest.MockedFn<any>
      findUnique: jest.MockedFn<any>
      update: jest.MockedFn<any>
      delete: jest.MockedFn<any>
    }
  }

export const PrismaServiceMock: IPrismaServiceMock = {
    player: {
        create: jest.fn().mockResolvedValue(singlePlayer),
        findMany: jest.fn().mockResolvedValue(playersList),
        findUnique: jest.fn().mockResolvedValue(singlePlayer),
        update: jest.fn().mockResolvedValue(singlePlayer),
        delete: jest.fn(),
    },
    team: {
        create: jest.fn().mockResolvedValue(singleTeam),
        findMany: jest.fn().mockResolvedValue(teamsList),
        findUnique: jest.fn().mockResolvedValue(singleTeam),
        update: jest.fn().mockResolvedValue(singleTeam),
        delete: jest.fn(),
    }
};