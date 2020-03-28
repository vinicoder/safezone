module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('company_events_labels', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      company_events_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'company_events',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      label_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'labels',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('company_events_labels');
  },
};
