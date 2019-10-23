import { Message } from '../message.entity';

export class MessageDto {
    readonly id: number;

    readonly author: string;

    readonly topic: string;

    readonly content: string;

    readonly createdAt: Date;

    readonly updatedAt: Date;

    constructor(message: Message) {
        this.id = message.id;
        this.author = message.author.userName;
        this.topic = message.topic.label;
        this.content = message.content;
        this.createdAt = message.createdAt;
        this.updatedAt = message.updatedAt;
    }
}
