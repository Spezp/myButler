
exports.up = function(knex, Promise) {
  return knex('todos')
  .update({
    date_entered: knex.fn.now(),
    completed: 'n'
  })
};

exports.down = function(knex, Promise) {
  return knex('todos')
  .update({
    date_entered: null,
    completed: null
  })
};
