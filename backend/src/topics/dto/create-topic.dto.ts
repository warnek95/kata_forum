import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateTopicDto {
    @IsString()
    @IsNotEmpty()
    readonly label: string;
}
