import { Message } from './message.entity';

export const messagesProviders = [{ provide: 'MessagesRepository', useValue: Message }];
