import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { Message } from '../messages/message.entity';
import { Topic } from '../topics/topic.entity';
import { ConfigService } from '../shared/config/config.service';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService: ConfigService) => {
            const dialect = configService.sequelizeOrmConfig.dialect;
            const username = configService.sequelizeOrmConfig.username;
            const password = configService.sequelizeOrmConfig.password;
            const host = configService.sequelizeOrmConfig.host;
            const port = configService.sequelizeOrmConfig.port;
            const db = configService.sequelizeOrmConfig.database;
            const uri = `${dialect}://${username}:${password}@${host}:${port}/${db}`;
            const sequelize = new Sequelize(uri);
            sequelize.addModels([User, Message, Topic]);
            await sequelize.sync();
            return sequelize;
        },
        inject: [ConfigService],
    },
];
