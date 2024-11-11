import mysql, { Connection } from 'mysql2/promise';

let connection: Connection | null = null;

export const connectDB = async (): Promise<Connection> => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT) || 3306,
      connectTimeout: 10000,
    });
    console.log('Conectado a la base de datos MYSQL');
  }
  
  return connection;
};