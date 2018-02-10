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


    getTodosByCatgsByUserId: function(userId, categoryName, callback) {
      // when we figure out the API stuff, this will be here using the searchTerm, returning category
      knex('todos')
      .join('categories', 'todos.category_id', '=', 'categories.id')
      .select('todos.id', 'todos.item', 'categories.name', 'categories.action')
      .where('user_id',userId).andWhere('categories.name',categoryName)
      .asCallback(function(err, rows) {
          if (err) return console.error(err);
          callback(rows);
      });
    },


    getCategory: function(searchTerm, callback) {
      // when we figure out the API stuff, this will be here using the searchTerm, returning category
      let category = 'books';
      knex.select('id', 'name', 'action')
      .from('categories')
      .where('name', 'like', `%${category}%`)
      .asCallback(function(err, rows) {
          if (err) return console.error(err);
          callback(rows);
      });
    },

    inserTodosByUserId: function(userId, todoName, callback) {
      getCategory(todoName, (rows) => {
        categoryId = rows[0].id;
<<<<<<< HEAD
    
=======
        console.log('categoryId in inserTodosByUserId: ', categoryId);

>>>>>>> 2fcac386afdef7648c0be16a8860e522a4738f30
        knex('todos')
        .insert({
          item: `${todoName}`,
          user_id: `${userId}`,
          category_id: `${categoryId}`,
          date_entered: knex.fn.now(),
          completed: 'n'
        })
        .asCallback(function(err) {
            if (err) return console.error(err);
            callback();
        });
      });
<<<<<<< HEAD
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
=======
>>>>>>> 2fcac386afdef7648c0be16a8860e522a4738f30
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


