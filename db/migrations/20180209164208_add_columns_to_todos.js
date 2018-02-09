
exports.up = function(knex, Promise) {
  return knex.schema.table('todos', function (table) {
    table.timestamp('date_entered');
    table.boolean('completed');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('todos', function (table) {
    table.dropColumn('date_entered');
    table.dropColumn('completed');
  })
};
