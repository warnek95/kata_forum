import {
    Controller,
    Req,
    Body,
    Post,
    UseGuards,
    Get,
    Param,
    ParseIntPipe,
    Delete,
    Put,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';
import { Message } from './message.entity';
import { MessageDto } from './dto/message.dto';
import { ErrorsMessage } from '../shared/error';

@Controller('/api/messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @Get()
    findAll(): Promise<MessageDto[]> {
        return this.messagesService.findAll();
    }

    @Get(':topicId')
    findAllByTopicId(@Param('topicId', new ParseIntPipe()) topicId: number): Promise<MessageDto[]> {
        return this.messagesService.findAllByTopicId(topicId);
    }

    @Post()
    create(
        @Body() createMessageDto: CreateMessageDto
    ): Promise<Message> {
        const errors = []; 
        if(!createMessageDto.content) errors.push({content: ErrorsMessage.EMPTY_OR_NULL});
        if(createMessageDto.content && !createMessageDto.content.startsWith("Bonjour ")) errors.push({content: ErrorsMessage.MUST_START_WITH});;
        if(!createMessageDto.authorId) errors.push({authorId: ErrorsMessage.EMPTY_OR_NULL});
        if(!createMessageDto.topicId) errors.push({topicId: ErrorsMessage.EMPTY_OR_NULL});
        if(errors.length > 0) throw new HttpException({errors : errors}, HttpStatus.BAD_REQUEST);
        return this.messagesService.create(createMessageDto);
    }
}
