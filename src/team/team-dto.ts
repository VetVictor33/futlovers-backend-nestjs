import { IsNotEmpty, IsUUID } from "class-validator";

export class FindOneParams {
    @IsUUID()
    @IsNotEmpty()
    id: string
}

export class CreateUpdateTeamDto {
    @IsNotEmpty()
    name: string
}