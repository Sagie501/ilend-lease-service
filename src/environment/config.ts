import Knex from 'knex';

const baseConfig: Config = {
  port: parseInt(process.env.PORT, 10) || 5003,
  serviceName: process.env.SERVICE_NAME || 'Lease Service',
  dbConfig: {
    client: process.env.DB_CLIENT || 'mysql',
    connection: {
      host : process.env.DB_HOST || '127.0.0.1',
      user : process.env.DB_USER || 'root',
      password : process.env.DB_PASSWORD || '1qaz!QAZ',
      database : process.env.DB_SCHEMA || 'ilend'
    }
  }
};

export const config: EnvironmentConfig = {
  dev: {
    ...baseConfig
  },
  prod: {
    ...baseConfig
  }
};

export interface EnvironmentConfig {
  dev: Config;
  prod: Config;
}

export interface Config {
  port: number;
  serviceName: string;
  dbConfig: Knex.Config;
}
