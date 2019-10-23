import { Topic } from './topic.entity';

export const topicsProviders = [{ provide: 'TopicsRepository', useValue: Topic }];
