
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
      return Promise.all([
        // Inserts seed entries
        knex('todos').insert({id: 1, item: 'To Kill a Mockingbird', user_id: '1', category_id: '3'}),
        knex('todos').insert({id: 2, item: 'Pride and Prejudice', user_id: '1', category_id: '3'}),
        knex('todos').insert({id: 3, item: 'The Diary of Anne Frank', user_id: '1', category_id: '3'}),
        knex('todos').insert({id: 4, item: '1984', user_id: '1', category_id: '3'}),
        knex('todos').insert({id: 5, item: 'THE WIZARD OF OZ', user_id: '1', category_id: '1'}),
        knex('todos').insert({id: 6, item: 'CITIZEN KANE', user_id: '1', category_id: '1'}),
        knex('todos').insert({id: 7, item: 'Cilantro', user_id: '1', category_id: '2'}),
        knex('todos').insert({id: 8, item: 'Uno', user_id: '1', category_id: '2'}),
        knex('todos').insert({id: 9, item: 'Rubber duck', user_id: '1', category_id: '4'}),
        knex('todos').insert({id: 10, item: 'Back scratcher', user_id: '1', category_id: '4'}),
        knex('todos').insert({id: 11, item: 'Harry Potter and the Sorcerer\'s Stone', user_id: '2', category_id: '3'}),
        knex('todos').insert({id: 12, item: 'The Lord of the Rings', user_id: '2', category_id: '3'}),
        knex('todos').insert({id: 13, item: 'The Great Gatsby', user_id: '2', category_id: '3'}),
        knex('todos').insert({id: 14, item: 'Charlotte\'s Web', user_id: '2', category_id: '3'}),
        knex('todos').insert({id: 15, item: 'Bonterra', user_id: '2', category_id: '2'}),
        knex('todos').insert({id: 16, item: 'River Cafe', user_id: '2', category_id: '2'}),
        knex('todos').insert({id: 17, item: 'Phil & Sebastian\'s', user_id: '3', category_id: '2'}),
        knex('todos').insert({id: 18, item: 'ALL ABOUT EVE', user_id: '3', category_id: '1'}),
        knex('todos').insert({id: 19, item: 'THE GODFATHER', user_id: '3', category_id: '1'}),
        knex('todos').insert({id: 20, item: 'Curling iron', user_id: '3', category_id: '4'}),
        knex('todos').insert({id: 21, item: 'diapers', user_id: '3', category_id: '4'}),
      ]);
};
