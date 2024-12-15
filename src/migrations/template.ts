import { QueryInterface, Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { wrapWithTransaction } from 'src/migrations/transactionWrapper';

module.exports = {
  up: wrapWithTransaction(
    async (transaction: Transaction, queryInterface: QueryInterface, sequelize: Sequelize): Promise<void> => {
      /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false,
      }], {});
    */
    },
  ),

  down: wrapWithTransaction(
    async (transaction: Transaction, queryInterface: QueryInterface, sequelize: Sequelize): Promise<void> => {
      /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    },
  ),
};
