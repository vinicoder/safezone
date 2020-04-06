module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'events',
      [
        {
          description: 'COVID-19',
          start_date: new Date(2019, 12, 20),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
};
