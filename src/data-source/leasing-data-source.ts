import { SQLDataSource } from './sql-data-source';
import Knex from 'knex';
import { LeasingConnector } from '../entities/leasing/leasing.connector';

export class LeasingDataSource extends SQLDataSource {
  public leasingConnector: LeasingConnector;

  constructor(knexConfig: Knex.Config) {
    super(knexConfig);

    this.leasingConnector = new LeasingConnector(this.knex);
  }
}
