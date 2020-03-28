module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'gender_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'genders',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'gender_id');
  },
};
