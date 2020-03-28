import { Model } from 'sequelize';

class CompanyEvents extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
        freezeTableName: true,
        tableName: 'company_events',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Events, {
      foreignKey: 'event_id',
      as: 'event',
    });
    this.belongsTo(models.Companies, {
      foreignKey: 'company_id',
      as: 'company',
    });
  }
}

export default CompanyEvents;
