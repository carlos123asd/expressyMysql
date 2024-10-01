import mysql, { Connection } from 'mysql2/promise';

let connection: Connection | null = null;

export const connectDB = async (): Promise<Connection> => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: process.env.USERDB,
      password: process.env.PASS_MYSQL,
      database: process.env.NAMEDB
    });
    console.log('Conectado a la base de datos MYSQL');
  }
  
  return connection;
};