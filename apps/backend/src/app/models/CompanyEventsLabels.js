import { Model } from 'sequelize';

class CompanyEventsLabels extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
        freezeTableName: true,
        tableName: 'company_events_labels',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.CompanyEvents, {
      foreignKey: 'company_events_id',
      as: 'company_events',
    });
    this.belongsTo(models.Labels, {
      foreignKey: 'label_id',
      as: 'labels',
    });
  }
}

export default CompanyEventsLabels;
