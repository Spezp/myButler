
exports.seed = function(knex, Promise) {
// Deletes ALL existing entries
  return Promise.all([
    // Inserts seed entries
    knex('todos').insert({item: 'To Kill a Mockingbird', user_id: '4', category_id: '3', date_entered: knex.fn.now(), completed: 'f'}),
    knex('todos').insert({item: 'Pride and Prejudice', user_id: '4', category_id: '3', date_entered: knex.fn.now(), completed: 'f'}),
    knex('todos').insert({item: 'The Diary of Anne Frank', user_id: '4', category_id: '3', date_entered: knex.fn.now(), completed: 'f'}),
    knex('todos').insert({item: '1984', user_id: '4', category_id: '3', date_entered: knex.fn.now(), completed: 'f'}),
    knex('todos').insert({item: 'Ghostbusters', user_id: '4', category_id: '1', date_entered: knex.fn.now(), completed: 'f'}),
    knex('todos').insert({item: 'Winchester', user_id: '4', category_id: '1', date_entered: knex.fn.now(), completed: 'f'}),
    knex('todos').insert({item: 'Cilantro', user_id: '4', category_id: '2', date_entered: knex.fn.now(), completed: 'f'}),
    knex('todos').insert({item: 'Uno', user_id: '4', category_id: '2', date_entered: knex.fn.now(), completed: 'f'}),
    knex('todos').insert({item: 'Rubber duck', user_id: '4', category_id: '4', date_entered: knex.fn.now(), completed: 'f'}),
    knex('todos').insert({item: 'Back scratcher', user_id: '4', category_id: '4', date_entered: knex.fn.now(), completed: 'f'}),
    knex('todos').insert({item: 'Harry Potter', user_id: '5', category_id: '3', date_entered: knex.fn.now(), completed: 'f'}),
    knex('todos').insert({item: 'The Lord of the Rings', user_id: '5', category_id: '3', date_entered: knex.fn.now(), completed: 'f'}),
    knex('todos').insert({item: 'The Great Gatsby', user_id: '5', category_id: '3', date_entered: knex.fn.now(), completed: 'f'}),
    knex('todos').insert({item: 'Charlottes Web', user_id: '5', category_id: '3', date_entered: knex.fn.now(), completed: 'f'}),
    knex('todos').insert({item: 'Bonterra', user_id: '5', category_id: '2', date_entered: knex.fn.now(), completed: 'f'}),
    knex('todos').insert({item: 'Anju', user_id: '5', category_id: '2', date_entered: knex.fn.now(), completed: 'f'}),
    knex('todos').insert({item: 'Market', user_id: '6', category_id: '2', date_entered: knex.fn.now(), completed: 'f'}),
    knex('todos').insert({item: 'Paddington', user_id: '6', category_id: '1', date_entered: knex.fn.now(), completed: 'f'}),
    knex('todos').insert({item: 'Tootsie', user_id: '6', category_id: '1', date_entered: knex.fn.now(), completed: 'f'}),
    knex('todos').insert({item: 'Curling iron', user_id: '6', category_id: '4', date_entered: knex.fn.now(), completed: 'f'}),
    knex('todos').insert({item: 'diapers', user_id: '6', category_id: '4', date_entered: knex.fn.now(), completed: 'f'})
  ]);
};
