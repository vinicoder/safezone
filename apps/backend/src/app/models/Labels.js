import Sequelize, { Model } from 'sequelize';

class Labels extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Labels;
