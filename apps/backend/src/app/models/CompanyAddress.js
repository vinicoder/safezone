import Sequelize, { Model } from 'sequelize';

class CompanyAddress extends Model {
  static init(sequelize) {
    super.init(
      {
        place_id: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.STRING,
        zipcode: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        complement: Sequelize.STRING,
        latitude: Sequelize.INTEGER,
        longitude: Sequelize.INTEGER,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: 'company_address',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Companies, {
      foreignKey: 'company_id',
      as: 'company',
    });
  }
}

export default CompanyAddress;
