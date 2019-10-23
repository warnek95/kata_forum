const sql = `
    insert into users(
        user_name,
        created_at,
        updated_at,
        deleted_at
    ) values (
        'tom',
        'now()',
        'now()',
        NULL
    );
    insert into users(
        user_name,
        created_at,
        updated_at,
        deleted_at
    ) values (
        'john',
        'now()',
        'now()',
        NULL
    );
`;

module.exports = {
    up: queryInterface => queryInterface.sequelize.query(sql),
    down: () => {},
};
