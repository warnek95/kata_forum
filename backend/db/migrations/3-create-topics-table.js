const sql = `
    create table if not exists topics (
        id serial primary key, 
        label varchar(255) unique,
        created_at timestamp with time zone, 
        updated_at timestamp with time zone, 
        deleted_at timestamp with time zone
    );
`;

module.exports = {
    up: queryInterface => queryInterface.sequelize.query(sql),
    down: () => {},
};