import { IsDefined, IsInt, IsNotEmpty, Min } from "class-validator";

export class CreateScoreDto {
    @IsNotEmpty()
    name: string;

    @IsDefined()
    @IsInt()
    @Min(0)
    score: number;
    createdAt: string;
}
