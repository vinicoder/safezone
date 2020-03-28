import Sequelize, { Model } from 'sequelize';

class Companies extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        activity: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Companies;
