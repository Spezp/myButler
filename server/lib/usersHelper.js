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
    addUser: function (newUser, callback) {
    knex('users')
    .insert(newUser)
    .asCallback(function(err) {
        if (err) return console.error(err);
        callback();
      });
    },

    findUser: function (email, callback) {
      knex.select('id')
      .from('users')
      .where('email', 'like', email)
      .asCallback(function(err, rows) {
          if (err) return console.error(err);
          callback(rows);
      });
    }
  }
}
