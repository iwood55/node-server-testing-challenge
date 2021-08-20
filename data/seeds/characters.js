exports.seed = function(knex) {
    return knex('characters').truncate()
      .then(function () {
        return knex('characters').insert([
          { name: 'isaac' },
          { name: 'stuart' },
          { name: 'jimBob' }
        ]);
      });
  };