import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Users from '../app/models/Users';
import Companies from '../app/models/Companies';
import CompanyAddress from '../app/models/CompanyAddress';
import CompanyEvents from '../app/models/CompanyEvents';
import CompanyEventsLabels from '../app/models/CompanyEventsLabels';
import CompanyLabels from '../app/models/CompanyLabels';
import Events from '../app/models/Events';
import Genders from '../app/models/Genders';
import Labels from '../app/models/Labels';

const models = [
  Companies,
  Labels,
  Events,
  Genders,
  Users,
  CompanyAddress,
  CompanyEvents,
  CompanyEventsLabels,
  CompanyLabels,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
