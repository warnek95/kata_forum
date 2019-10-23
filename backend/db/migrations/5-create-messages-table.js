const sql = `
    create table if not exists messages (
        id serial primary key, 
        author_id bigint not null,
        topic_id bigint not null,
        content varchar(255),
        created_at timestamp with time zone, 
        updated_at timestamp with time zone, 
        deleted_at timestamp with time zone,
        foreign key (author_id) references users(id),
        foreign key (topic_id) references topics(id)
    );
`;

module.exports = {
    up: queryInterface => queryInterface.sequelize.query(sql),
    down: () => {},
};