
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
      return Promise.all([
        // Inserts seed entries
        knex('todos').insert({item: 'To Kill a Mockingbird', user_id: '1', category_id: '3'}),
        knex('todos').insert({item: 'Pride and Prejudice', user_id: '1', category_id: '3'}),
        knex('todos').insert({item: 'The Diary of Anne Frank', user_id: '1', category_id: '3'}),
        knex('todos').insert({item: '1984', user_id: '1', category_id: '3'}),
        knex('todos').insert({item: 'THE WIZARD OF OZ', user_id: '1', category_id: '1'}),
        knex('todos').insert({item: 'CITIZEN KANE', user_id: '1', category_id: '1'}),
        knex('todos').insert({item: 'Cilantro', user_id: '1', category_id: '2'}),
        knex('todos').insert({item: 'Uno', user_id: '1', category_id: '2'}),
        knex('todos').insert({item: 'Rubber duck', user_id: '1', category_id: '4'}),
        knex('todos').insert({item: 'Back scratcher', user_id: '1', category_id: '4'}),
        knex('todos').insert({item: 'Harry Potter and the Sorcerer\'s Stone', user_id: '2', category_id: '3'}),
        knex('todos').insert({item: 'The Lord of the Rings', user_id: '2', category_id: '3'}),
        knex('todos').insert({item: 'The Great Gatsby', user_id: '2', category_id: '3'}),
        knex('todos').insert({item: 'Charlotte\'s Web', user_id: '2', category_id: '3'}),
        knex('todos').insert({item: 'Bonterra', user_id: '2', category_id: '2'}),
        knex('todos').insert({item: 'River Cafe', user_id: '2', category_id: '2'}),
        knex('todos').insert({item: 'Phil & Sebastian\'s', user_id: '3', category_id: '2'}),
        knex('todos').insert({item: 'ALL ABOUT EVE', user_id: '3', category_id: '1'}),
        knex('todos').insert({item: 'THE GODFATHER', user_id: '3', category_id: '1'}),
        knex('todos').insert({item: 'Curling iron', user_id: '3', category_id: '4'}),
        knex('todos').insert({item: 'diapers', user_id: '3', category_id: '4'}),
      ]);
};
