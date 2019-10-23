import { Module } from '@nestjs/common';
import { TopicsController } from './topics.controller';
import { topicsProviders } from './topics.providers';
import { DatabaseModule } from '../database/database.module';
import { TopicsService } from './topics.service';

@Module({
    imports: [DatabaseModule],
    controllers: [TopicsController],
    providers: [TopicsService, ...topicsProviders],
    exports: [TopicsService],
})
export class TopicsModule {}
