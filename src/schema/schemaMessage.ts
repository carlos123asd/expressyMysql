export const createTableMessages = `
    create table IF NOT EXISTS messages(
        idMessage INT auto_increment primary key,
        date datetime not null,
        customer varchar(50) not null,
        email varchar(50) not null,
        phone varchar(50) not null,
        reason varchar(50) not null,
        comment TEXT not null,
        status ENUM('archived','published','none') DEFAULt 'none'
    );
`