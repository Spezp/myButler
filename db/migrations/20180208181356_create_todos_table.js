
exports.up = function(knex, Promise) {
  return knex.schema.createTable('todos', function (table) {
    table.increments();
    table.string('item');
    table.integer('user_id').unsigned();
    table.integer('category_id').unsigned();
    table.foreign('user_id').references('users.id');
    table.foreign('category_id').references('categories.id');
  });  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('todos');
};

