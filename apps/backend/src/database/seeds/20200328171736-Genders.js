module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'genders',
      [
        {
          abbreviation: 'FE',
          description: 'Feminino',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          abbreviation: 'MF',
          description: 'Masculino',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          abbreviation: 'NB',
          description: 'Não binário',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
};
