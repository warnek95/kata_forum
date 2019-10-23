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
    tableName: 'users',
})
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: string;

    @Unique
    @Column({ field: 'user_name' })
    userName: string;

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
