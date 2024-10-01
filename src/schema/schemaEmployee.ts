export const createTableUsers = `
  create table IF NOT EXISTS users(
      idUser INT auto_increment primary key,
      photo TEXT NOT NULL,
      name varchar(50) not null,
      email varchar(50) UNIQUE not null,
      password TEXT not null,
      startdate datetime not null,
      description	TEXT not null,
      phone varchar(50) not null,
      status ENUM('active','inactive') DEFAULT 'active' not null
  );
`