import { User } from '../users/user.entity';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './message.entity';
import { MessageDto } from './dto/message.dto';
import { Topic } from '../topics/topic.entity';

@Injectable()
export class MessagesService {
    constructor(
        @Inject('MessagesRepository')
        private readonly messagesRepository: typeof Message,
    ) {}

    async findAll(): Promise<MessageDto[]> {
        const messages = await this.messagesRepository.findAll<Message>({
            include: [User, Topic],
        });
        return messages.map((message: Message) => {
            return new MessageDto(message);
        });
    }

    async findAllByTopicId(topicId:number): Promise<MessageDto[]> {
        const messages = await this.messagesRepository.findAll<Message>({
            include: [{
                model: User
            },{
                model: Topic,
                where: {id: topicId}
            }],
        });
        return messages.map((message: Message) => {
            return new MessageDto(message);
        });
    }

    async create(createMessageDto: CreateMessageDto): Promise<Message> {
        const message = new Message();
        message.authorId = createMessageDto.authorId;
        message.topicId = createMessageDto.topicId;
        message.content = createMessageDto.content;

        try {
            return await message.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
