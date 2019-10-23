import {
    Table,
    PrimaryKey,
    AutoIncrement,
    Column,
    DataType,
    Model,
    ForeignKey,
    Unique,
    Length,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { Topic } from '../topics/topic.entity';

@Table({
    tableName: 'messages',
})
export class Message extends Model<Message> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.BIGINT,
        field: 'author_id'
    })
    authorId: string;

    @ForeignKey(() => Topic)
    @Column({
        type: DataType.BIGINT,
        field: 'topic_id'
    })
    topicId: string;

    @Column
    content: string;

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    @DeletedAt
    @Column({ field: 'deleted_at' })
    deletedAt: Date;

    @BelongsTo(() => User)
    author: User;

    @BelongsTo(() => Topic)
    topic: Topic;
}
