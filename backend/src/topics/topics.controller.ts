import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    ParseIntPipe,
    HttpException, 
    HttpStatus
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicDto } from './dto/topic.dto';
import { CreateTopicDto } from './dto/create-topic.dto';
import { Topic } from './topic.entity';
import { ErrorsMessage } from '../shared/error';

@Controller('/api/topics')
export class TopicsController {
    constructor(private readonly topicsService: TopicsService) {}

    @Get()
    findAll(): Promise<TopicDto[]> {
        return this.topicsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe()) id: number): Promise<TopicDto> {
        return this.topicsService.findOne(id);
    }

    @Post()
    create(
        @Body() createTopicDto: CreateTopicDto
    ): Promise<Topic> {
        const errors = []; 
        if(!createTopicDto.label) errors.push({"label" : ErrorsMessage.EMPTY_OR_NULL});
        if(errors.length > 0) throw new HttpException({errors : errors}, HttpStatus.BAD_REQUEST);
        return this.topicsService.create(createTopicDto);
    }

}
