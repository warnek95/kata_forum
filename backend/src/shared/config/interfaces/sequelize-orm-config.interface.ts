export interface SequelizeOrmConfig {
    dialect: string;
    host: string;
    port: string;
    username: string;
    password: string;
    database: string;
    logging?: boolean;
    operatorsAliases?: boolean;
}
