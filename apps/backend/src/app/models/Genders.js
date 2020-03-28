import Sequelize, { Model } from 'sequelize';

class Genders extends Model {
  static init(sequelize) {
    super.init(
      {
        abbreviation: Sequelize.STRING,
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Genders;
