import Knex from 'knex';
import { Leasing } from './leasing.model';

export class LeasingConnector {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  async getLeasingById(leasingId: number) {
    return this.knex.select('*').from('leasing').where({ id: leasingId }).first();
  }

  async openLeaseRequest(leasing: Leasing) {
    return this.knex.insert(leasing).into('leasing').then(([id]) => {
      return this.getLeasingById(id);
    }, (err) => {
      throw new Error(err.sqlMessage);
    });
  }
}
