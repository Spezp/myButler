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
  knex.select('name', 'action')
  .from('categories')
  .where('name', 'like', `%${category}%`)
  .asCallback(function(err, rows) {
      if (err) return console.error(err);
      callback(rows);
  });
}

// this is just testing the function works - can get rid of when use function in another file
getCategory('books', (rows) => {
  console.log('rows returned: ', rows);  
});

exports.getCategory = getCategory;



