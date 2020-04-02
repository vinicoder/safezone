module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('users', 'token', Sequelize.STRING),
      queryInterface.addColumn('users', 'token_created_at', Sequelize.DATE),
    ]);
  },

  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('users', 'token'),
      queryInterface.removeColumn('users', 'token_created_at'),
    ]);
  },
};
