import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
    @IsNumber()
    readonly authorId: string;

    @IsNumber()
    readonly topicId: string;

    @IsNotEmpty()
    @IsString()
    readonly content: string;
}
