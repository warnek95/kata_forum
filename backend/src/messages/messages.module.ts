import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { messagesProviders } from './messages.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [MessagesController],
    providers: [MessagesService, ...messagesProviders],
    exports: [],
})
export class MessagesModule {}
