import Sequelize, { Model } from 'sequelize';

class Events extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        start_date: Sequelize.DATE,
        end_date: { type: Sequelize.DATE, defaultValue: null, allowNull: true },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Events;
