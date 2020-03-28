import { Model } from 'sequelize';

class CompanyLabels extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
        freezeTableName: true,
        tableName: 'company_labels',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Labels, {
      foreignKey: 'label_id',
      as: 'label',
    });
    this.belongsTo(models.Companies, {
      foreignKey: 'company_id',
      as: 'company',
    });
  }
}

export default CompanyLabels;
