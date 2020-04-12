import Knex from 'knex';
import { Leasing } from './leasing.model';
import { LeasingStatus } from '../../enums/leasing-status/leasing-status.enum';

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

  async setLeaseRequestStatus(leasingId: number, status: LeasingStatus) {
    return this.knex('leasing').where({ id: leasingId }).update({ status }).then((id) => {
      return this.getLeasingById(id);
    }, (err) => {
      throw new Error(err.sqlMessage);
    });
  }
}
