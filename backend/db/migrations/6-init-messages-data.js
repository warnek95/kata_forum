const sql = `
    insert into messages(
        author_id,
        topic_id,
        content,
        created_at,
        updated_at,
        deleted_at
    ) values (
        1,
        2,
        'hey people',
        'now()',
        'now()',
        NULL
    );
    insert into messages(
        author_id,
        topic_id,
        content,
        created_at,
        updated_at,
        deleted_at
    ) values (
        2,
        1,
        'nest sounds interesting',
        'now()',
        'now()',
        NULL
    );
`;

module.exports = {
    up: queryInterface => queryInterface.sequelize.query(sql),
    down: () => {},
};
