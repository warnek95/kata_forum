import { Topic } from '../topic.entity';

export class TopicDto {
    id: string;

    readonly label: string;

    constructor(topic: Topic) {
        this.id = topic.id;
        this.label = topic.label;
    }
}
