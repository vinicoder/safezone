module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'genders',
      [
        {
          abbreviation: 'MF',
          description: 'Masculino',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          abbreviation: 'FE',
          description: 'Feminino',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          abbreviation: 'HTG',
          description: 'Homem trangênero',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          abbreviation: 'MTG',
          description: 'Mulher trangênero',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          abbreviation: 'HTS',
          description: 'Homem transexual',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          abbreviation: 'MTS',
          description: 'Mulher transexual',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          abbreviation: 'NSR',
          description: 'Não sei responder',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          abbreviation: 'PNR',
          description: 'Prefiro não responder',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          abbreviation: 'NB',
          description: 'Outro',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
};
