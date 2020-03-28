module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'labels',
      [
        {
          description: 'Home-office',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: 'Fechada',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: 'Menos colaboradores',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: 'Horas reduzidas',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: 'Colaboradores em "férias"',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
};
