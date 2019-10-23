const sql = `
    create table if not exists users (
        id serial primary key, 
        user_name varchar(255) unique,
        created_at timestamp with time zone, 
        updated_at timestamp with time zone, 
        deleted_at timestamp with time zone
    );
`;

module.exports = {
    up: queryInterface => queryInterface.sequelize.query(sql),
    down: () => {},
};