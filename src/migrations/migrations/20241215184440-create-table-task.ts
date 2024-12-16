import { QueryInterface, Transaction } from 'sequelize';
import { DataType, Sequelize } from 'sequelize-typescript';
import { wrapWithTransaction } from 'src/migrations/transactionWrapper';
import { Columns, Tables } from '../dictionary';

module.exports = {
  up: wrapWithTransaction(
    async (transaction: Transaction, queryInterface: QueryInterface, sequelize: Sequelize): Promise<void> => {
      return queryInterface.createTable(
        Tables.tasks,
        {
          [Columns.id]: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          [Columns.createdAt]: {
            type: DataType.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('NOW()'),
          },
          [Columns.updatedAt]: {
            type: DataType.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('NOW()'),
          },
          [Columns.title]: {
            type: DataType.STRING,
            allowNull: false,
          },
        },
        { transaction },
      );
    },
  ),

  down: wrapWithTransaction(
    async (transaction: Transaction, queryInterface: QueryInterface, sequelize: Sequelize): Promise<void> => {
      return queryInterface.dropTable(Tables.tasks, { transaction });
    },
  ),
};
