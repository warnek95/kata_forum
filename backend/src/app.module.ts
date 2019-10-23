import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { MessagesModule } from './messages/messages.module';
import { TopicsModule } from './topics/topics.module';

@Module({
  imports: [UsersModule, SharedModule, MessagesModule, TopicsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
