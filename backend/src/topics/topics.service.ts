import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Topic } from './topic.entity';
import { TopicDto } from './dto/topic.dto';
import { CreateTopicDto } from './dto/create-topic.dto';

@Injectable()
export class TopicsService {

    constructor(
        @Inject('TopicsRepository')
        private readonly topicsRepository: typeof Topic,
    ) {}

    async findAll(): Promise<TopicDto[]> {
        const topics = await this.topicsRepository.findAll<Topic>();
        return topics.map((topic: Topic) => {
            return new TopicDto(topic);
        });
    }

    async findOne(id: number): Promise<TopicDto> {
        const topic = await this.topicsRepository.findByPk<Topic>(id);
        if (!topic) {
            throw new HttpException(
                'Topic with given id not found',
                HttpStatus.NOT_FOUND,
            );
        }

        return new TopicDto(topic);
    }

    async create(createTopicDto: CreateTopicDto): Promise<Topic> {
        const topic = new Topic();
        topic.label = createTopicDto.label;

        try {
            return await topic.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
