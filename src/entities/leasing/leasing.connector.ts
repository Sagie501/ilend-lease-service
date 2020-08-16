import Knex from "knex";
import { Leasing, User } from "./leasing.model";
import { LeasingStatus } from "../../enums/leasing-status/leasing-status.enum";
import * as braintree from "braintree";

export class LeasingConnector {
  private knex: Knex;
  private gateway;

  constructor(knex: Knex) {
    this.knex = knex;
    this.gateway = braintree.connect({
      environment: braintree.Environment.Sandbox,
      merchantId: "jtmyj9t6gxb35x4f",
      publicKey: "wzb99wrnbg53mqbv",
      privateKey: "7ab26f8f6f56c5b0110816889cc52ef0",
    });
  }

  async getLeasingById(leasingId: number) {
    return this.knex
      .select("*")
      .from("leasing")
      .where({ id: leasingId })
      .first();
  }

  async getAllLeasesByLesseeId(lesseeId: number) {
    return this.knex.select("*").from("leasing").where({ lesseeId });
  }

  async getAllOpenedRequests(lessorId: number) {
    let subQuery = this.knex
      .select("id")
      .from("product")
      .where({ ownerId: lessorId });
    return this.knex
      .select("*")
      .from("leasing")
      .where("productId", "in", subQuery)
      .andWhere("status", "=", LeasingStatus.WAITING_FOR_APPROVE);
  }

  async getAllOnGoingDeliveriesRequests(lessorId: number) {
    let subQuery = this.knex
      .select("id")
      .from("product")
      .where({ ownerId: lessorId });
    return this.knex
      .select("*")
      .from("leasing")
      .where("productId", "in", subQuery)
      .andWhere("status", "=", LeasingStatus.IN_DELIVERY);
  }

  async getAllOnGoingRequests(lessorId: number) {
    let subQuery = this.knex
      .select("id")
      .from("product")
      .where({ ownerId: lessorId });
    return this.knex
      .select("*")
      .from("leasing")
      .where("productId", "in", subQuery)
      .andWhere("status", "in", [
        LeasingStatus.WAITING_FOR_DELIVERY,
        LeasingStatus.DELIVERED,
        LeasingStatus.NEED_TO_RETURN,
      ]);
  }

  async getAllLeasingRequests(lessorId: number) {
    let subQuery = this.knex
      .select("id")
      .from("product")
      .where({ ownerId: lessorId });
    return this.knex
      .select("*")
      .from("leasing")
      .where("productId", "in", subQuery);
  }

  async getAllLeasings() {
    return this.knex.select("*").from("leasing");
  }

  async clientToken() {
    return new Promise((resolve, reject) => {
      this.gateway.clientToken.generate(
        {
          customerId: "651126756",
        },
        function (err, response) {
          var clientToken = response.clientToken;
          resolve(clientToken);
        }
      );
    });
  }

  async openLeaseRequest(leasing: Leasing, cardNonce: string, price: number) {
    return new Promise(
      (resolve, reject) => {
        //   this.gateway.transaction.sale(
        //     {
        //       amount: price,
        //       paymentMethodNonce: cardNonce,
        //       customer: {
        //         firstName: user.firstName,
        //         lastName: user.lastName,
        //         email: user.email,
        //       },
        //     },
        //     (err, result) => {
        //       if (result.success) {
        //         leasing.transactionId = result.transaction.id;
        //         console.dir(result);

        leasing.total_price = price;
        leasing.payment_method = cardNonce;

        this.knex
          .insert(leasing)
          .into("leasing")
          .then(
            ([id]) => {
              resolve(this.getLeasingById(id));
            },
            (err) => {
              reject(err.sqlMessage);
            }
          );
        // } else {
        //   reject(result.message);
        // }
      }
      //   );
    );
  }

  async handlePayment(leasingID: number) {
    return this.knex("leasing")
      .where({ id: leasingID })
      .then((leasings) => {
        let leasing = leasings[0];
        console.dir(leasing);

        return leasing;
      });
  }

  async setLeaseRequestStatus(leasingId: number, status: LeasingStatus) {
    await this.handlePayment(leasingId);

    return this.knex("leasing")
      .where({ id: leasingId })
      .update({ status })
      .then(
        (id) => {
          return this.getLeasingById(id);
        },
        (err) => {
          throw new Error(err.sqlMessage);
        }
      );
  }
}
