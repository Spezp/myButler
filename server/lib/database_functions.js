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

function getCategory(searchTerm, callback) {
  // when we figure out the API stuff, this will be here using the searchTerm, returning category
  let category = 'books';
  knex.select('id', 'name', 'action')
  .from('categories')
  .where('name', 'like', `%${category}%`)
  .asCallback(function(err, rows) {
      if (err) return console.error(err);
      callback(rows);
  });
}

function getTodosByCatgsByUserId(userId, categoryName, callback) {
  // when we figure out the API stuff, this will be here using the searchTerm, returning category
  knex('todos')
  .join('categories', 'todos.category_id', '=', 'categories.id')
  .select('todos.id', 'todos.item', 'categories.name', 'categories.action')
  .where('user_id',`${userId}`).andWhere('categories.name',`${categoryName}`)
  .asCallback(function(err, rows) {
      if (err) return console.error(err);
      callback(rows);
  });
}

function inserTodosByUserId(userId, todoName, callback) {
  getCategory(todoName, (rows) => {
    categoryId = rows[0].id;
    console.log('categoryId in inserTodosByUserId: ', categoryId);  

    knex('todos')
    .insert({
      item: `${todoName}`, 
      user_id: `${userId}`, 
      category_id: `${categoryId}`})
    .asCallback(function(err) {
        if (err) return console.error(err);
        callback();
    });
  });
}

// this is just testing the function works - can get rid of when use function in another file
// inserTodosByUserId(1, 'My Sister\'s Keeper', (categoryId) => {
// });

// this is just testing the function works - can get rid of when use function in another file
// getCategory('books', (rows) => {
//   console.log('rows returned: ', rows);  
// });

// this is just testing the function works - can get rid of when use function in another file
// getTodosByCatgsByUserId('1', 'books', (rows) => {
//   console.log('rows returned: ', rows);  
// });

exports.getCategory = getCategory;
exports.getTodosByCatgsByUserId = getTodosByCatgsByUserId;
exports.inserTodosByUserId = inserTodosByUserId;



