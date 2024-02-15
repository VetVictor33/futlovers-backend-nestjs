import { IsNotEmpty, IsPositive, IsUUID } from "class-validator";

export class FindOneParams {
    @IsUUID()
    @IsNotEmpty()
    id: string
}

export class CreatePlayerDto {
    @IsNotEmpty()
    name: string

    @IsPositive()
    age: number
}

export class UpdatePlayerDto {
    @IsNotEmpty()
    name: string

    @IsPositive()
    age: number

    @IsUUID()
    @IsNotEmpty()
    team_id: string
}