
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(() => {
      return knex('users').del()
    .then(() => {
      return knex('categories').del()
    })})
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('categories').insert({id: 1, name: 'movies', action: 'watch'}),
        knex('categories').insert({id: 2, name: 'restaurants', action: 'eat'}),
        knex('categories').insert({id: 3, name: 'books', action: 'read'}),
        knex('categories').insert({id: 4, name: 'products', action: 'buy'})
      ]);
    });
};

