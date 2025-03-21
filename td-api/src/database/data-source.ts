import * as dotenv from 'dotenv';
dotenv.config(); // Load .env variables

import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/src/database/migrations/*.js'],
  synchronize: false,
  migrationsRun: true,
});
