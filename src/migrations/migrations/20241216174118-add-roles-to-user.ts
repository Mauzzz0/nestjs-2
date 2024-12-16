import { QueryInterface, Transaction } from 'sequelize';
import { DataType, Sequelize } from 'sequelize-typescript';
import { wrapWithTransaction } from 'src/migrations/transactionWrapper';
import { Roles } from '../../app.types';
import { Columns, Tables } from '../dictionary';

module.exports = {
  up: wrapWithTransaction(
    async (transaction: Transaction, queryInterface: QueryInterface, sequelize: Sequelize): Promise<void> => {
      return queryInterface.addColumn(
        Tables.users,
        Columns.role,
        {
          type: DataType.STRING,
          defaultValue: Roles.user,
          allowNull: false,
        },
        { transaction },
      );
    },
  ),

  down: wrapWithTransaction(
    async (transaction: Transaction, queryInterface: QueryInterface, sequelize: Sequelize): Promise<void> => {
      return queryInterface.removeColumn(Tables.users, Columns.role, { transaction });
    },
  ),
};
