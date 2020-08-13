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

  async getAllLeasesByLesseeId(lesseeId: number) {
    return this.knex.select('*').from('leasing').where({ lesseeId });
  }

  async getAllOpenedRequests(lessorId: number) {
    let subQuery = this.knex.select('id').from('product').where({ ownerId: lessorId});
    return this.knex.select('*').from('leasing').where('productId', 'in', subQuery).andWhere('status', '=', LeasingStatus.WAITING_FOR_APPROVE);
  }

  async getAllOnGoingDeliveriesRequests(lessorId: number) {
    let subQuery = this.knex.select('id').from('product').where({ ownerId: lessorId});
    return this.knex.select('*').from('leasing').where('productId', 'in', subQuery).andWhere('status', '=', LeasingStatus.IN_DELIVERY);
  }

  async getAllOnGoingRequests(lessorId: number) {
    let subQuery = this.knex.select('id').from('product').where({ ownerId: lessorId});
    return this.knex.select('*').from('leasing').where('productId', 'in', subQuery).andWhere('status', 'in', [LeasingStatus.WAITING_FOR_DELIVERY, LeasingStatus.DELIVERED, LeasingStatus.NEED_TO_RETURN]);
  }

  async getAllLeasingRequests(lessorId: number) {
    let subQuery = this.knex.select('id').from('product').where({ ownerId: lessorId});
    return this.knex.select('*').from('leasing').where('productId', 'in', subQuery);
  }

  async getAllLeasings() {
    return this.knex.select('*').from('leasing');
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