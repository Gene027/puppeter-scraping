/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const dotenv = require('dotenv');
import { DataSource } from 'typeorm';

dotenv.config({ path: path.join(__dirname, '.env') });

const { env } = process;

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/src/**/*.entity.{ts,js}'],
  migrations: [__dirname + `/src/migrations/*{.ts,.js}`],
});
