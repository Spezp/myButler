require('dotenv').config();

var knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
  }
});

module.exports = function (knex) {

  return {

    getIndividTodo: function(todoId, callback) {
      knex('todos')
      .join('categories', 'todos.category_id', '=', 'categories.id')
      .select('todos.id', 'todos.item', 'categories.name', 'categories.action')
      .where('todos.id', todoId)
      .asCallback(function(err, row) {
          if (err) return console.error(err);
          callback(row);
      });
    },

    getTodosByCatgsByUserId: function(userId, categoryName, callback) {
      knex('todos')
      .join('categories', 'todos.category_id', '=', 'categories.id')
      .select('todos.id', 'todos.item', 'categories.name', 'categories.action')
      .where('user_id', userId).andWhere('categories.name', categoryName)
      .asCallback(function(err, rows) {
          if (err) return console.error(err);
          callback(rows);
      });
    },

    inserTodosByUserId: function(userId, todoName, callback) {
      // get the category id from the category table using the first 'verb' of the input field
      let getCategory = function(todoName, callback) {
        let todoItem = todoName.split(' ');
        categoryAction = todoItem.shift();
        knex.select('id', 'name', 'action')
        .from('categories')
        .where('action', 'like', `%${categoryAction}%`)
        .asCallback(function(err, rows) {
            if (err) return console.error(err);
            callback(rows);
        });
      };
  
      let todoItem = todoName.split(' ');
      categoryAction = todoItem.shift();
      getCategory(todoName, (rows) => {
        categoryId = rows[0].id;
        return categoryId;
      });

      knex('todos')
      .insert({
        item: `${todoItem}`,
        user_id: `${userId}`,
        category_id: `${categoryId}`,
        date_entered: knex.fn.now(),
        completed: 'n'
      })
      .asCallback(function(err) {
          if (err) return console.error(err);
          callback();
      });
    },

    deleteIndividTodo: function(todoId, callback) {
      knex('todos')
      .where('todos.id', todoId)
      .del()
      .asCallback(function(err) {
          if (err) return console.error(err);
          callback();
      });
    },

    // expected arguments: todoId; itemChange as text or null; catagChange as text or null
    // completed as 't' or null; callback.
    updateTodosByTodoId: function(todoId, itemChange, categChange, completed, callback) {
      let categoryId = knex('categories')
        .where({
        name: categChange,
      }).select('id');

      if (itemChange) {
        knex('todos')
        .where('id', '=', todoId)
        .update({
          item: itemChange
        })
        .asCallback(function(err) {
          if (err) return console.error(err);
          callback();
      });
      }
      if (categChange) {
        knex('todos')
        .where('id', '=', todoId)
        .update({
          category_id: categoryId
        })
        .asCallback(function(err) {
          if (err) return console.error(err);
          callback();
      });
      }
      if (completed) {
        knex('todos')
        .where('id', '=', todoId)
        .update({
          completed: completed
        })
        .asCallback(function(err) {
          if (err) return console.error(err);
          callback();
      });
      }
    }
  }
}


// this is just testing the function works - can get rid of when use function in another file
// inserTodosByUserId(1, 'Never mind the buzzcocks', (categoryId) => {
// });

// this is just testing the function works - can get rid of when use function in another file
// getCategory('books', (rows) => {
//   console.log('rows returned: ', rows);
// });

// this is just testing the function works - can get rid of when use function in another file

// getTodosByCatgsByUserId('1', 'books', (rows) => {
//   console.log('rows returned: ', rows);
// });

// getTodosAndCatgsByUserId(1, (rows) => {
//   console.log('rows returned: ', rows);
// });


