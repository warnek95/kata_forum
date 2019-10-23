const sql = `
    insert into topics(
        label,
        created_at,
        updated_at,
        deleted_at
    ) values (
        'tech',
        'now()',
        'now()',
        NULL
    );
    insert into topics(
        label,
        created_at,
        updated_at,
        deleted_at
    ) values (
        'random',
        'now()',
        'now()',
        NULL
    );
`;

module.exports = {
    up: queryInterface => queryInterface.sequelize.query(sql),
    down: () => {},
};
