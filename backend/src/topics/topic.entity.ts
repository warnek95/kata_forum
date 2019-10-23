import {
    Table,
    Column,
    Model,
    Unique,
    DataType,
    PrimaryKey,
    AutoIncrement,
    CreatedAt,
    UpdatedAt,
    DeletedAt
} from 'sequelize-typescript';

@Table({
    tableName: 'topics',
})
export class Topic extends Model<Topic> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: string;

    @Unique
    @Column
    label: string;

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    @DeletedAt
    @Column({ field: 'deleted_at' })
    deletedAt: Date;
}
