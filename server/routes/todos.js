"use strict";

const dataHelper      = require("../lib/database_functions");
const express         = require('express');
const todoRoutes      = express.Router();

module.exports = (dataHelper, https, prodAdv, btoken) => {

  //overview on the home page
  //response with all todos in there category under this user
  //if not log in, AJAX in app.js will receive a false value and create a flash message key = msg, value see below
  //if log in, AJAX in app.js will receive json with key = category, value = number of items
  todoRoutes.get('/categories', (req, res) => {
    if (!req.session.user_id){
      res.json({login: false, msg: 'Please log in'});
    } else {
      const overview = {};
      const user_id = req.session.user_id;
      dataHelper.getTodosByCatgsByUserId(user_id, "movies", (rows) => {
        overview.movies = rows.length;
        dataHelper.getTodosByCatgsByUserId(user_id, "restaurants", (rows) => {
          overview.restaurants = rows.length;
          dataHelper.getTodosByCatgsByUserId(user_id, "books", (rows) => {
            overview.books = rows.length;
            dataHelper.getTodosByCatgsByUserId(user_id, "products", (rows) => {
              overview.products = rows.length;
              res.json(overview);
            });
          });
        });
      });
    }
  });

  //display all items in four categories for swipes
  todoRoutes.get('/', (req, res) => {
    if (!req.session.user_id){
      res.json({login: false, msg: 'Please log in'});
    } else {
      let fullList = [];
      const user_id = req.session.user_id;
      dataHelper.getTodosByCatgsByUserId(user_id, "movies", (rows) => {
        fullList = rows;
        dataHelper.getTodosByCatgsByUserId(user_id, "restaurants", (rows) => {
          fullList = fullList.concat(rows);
          dataHelper.getTodosByCatgsByUserId(user_id, "books", (rows) => {
            fullList = fullList.concat(rows);
            dataHelper.getTodosByCatgsByUserId(user_id, "products", (rows) => {
              fullList = fullList.concat(rows);
              const fullListSorted = fullList.sort((a, b)=>{
                return (a.id - b.id);
              });
              res.json(fullListSorted);
            });
          });
        });
      });
    }
  });



  // when a user clicks '+' button, will send todo item in req.body.
  // TODO- need to change to a POST route when the action from the button is linked up
  // this is now harcoded in the url. will have to pass it in, then insert item

  todoRoutes.post('/', (req, res) => {
    const userId = req.session.user_id;
    const todoItem = req.body.item;
    if (todoItem) {
      dataHelper.inserTodosByUserId(userId, todoItem, ()=> {
        res.json({completed: true});
      });
    } else {
      res.status(400).json({error: 'invalid request: no todo item to insert'});
    }
  });


  //Font-end!! remove data-id, use data-item or item.text() in url
  todoRoutes.get('/:item', (req, res) => {
    const item_id = req.params.item;
    dataHelper.getIndividTodo(item_id, (rows) => {
      let category = rows[0].name;
      let item = rows[0].item;
      if (category === 'restaurants') {
        const option = {
          hostname: 'api.yelp.com',
          path: `/v3/businesses/search?term=${item}&latitude=51.044270&longitude=-114.062019&limit=2`,
          headers: {
            Authorization: btoken['b']
          }
        };
        let apiResult;
        https.get(option, function(response) {
          response.setEncoding('utf8');
          response.on('error', function(err){
            res.json(err);
          });
          response.on('data', function (data) {
            apiResult = data;
          });
          response.on('end', function(){
            const apiResultParsed = JSON.parse(apiResult);
            const addrArr = apiResultParsed['businesses'][0]['location']['display_address'];
            const addr = addrArr.join(' ');
            const extraInfo = {
              url: apiResultParsed['businesses'][0]['url'],
              rating: apiResultParsed['businesses'][0]['rating'],
              address: addr,
              price: apiResultParsed['businesses'][0]['price']
            };
            res.json(extraInfo);
          });
        });
      }
      if (category === 'movies') {
        const option = {
          hostname: 'www.omdbapi.com',
          path: `/?apikey=thewdb&t=${item}`
        };
        let buffer = [];
        https.get(option, function(response) {
          response.setEncoding('utf8');
          response.on('error', function(err){
            console.log(err);
          });
          response.on('data', function (data) {
            buffer.push(data);

          });
          response.on('end', function(){
            const apiResult = buffer.join('');
            const apiResultParsed = JSON.parse(apiResult);
            const extraInfo = {
              rating: apiResultParsed['imdbRating'],
              poster: apiResultParsed['Poster']
            };
            res.send(extraInfo);
          });
        });
      }
      if (category === 'books') {
        console.log('hit books');
        prodAdv.call("ItemSearch", {SearchIndex: "Books", Keywords: `${item}`}, function(err, result) {
          console.log(err);
          if(result['Items']['Item'].length) {
            const extraInfo = result['Items']['Item'][0]['DetailPageURL'];
            res.json({url: extraInfo});
          } else {
            res.json({msg: 'Sorry, no related product found on Amazon'});
          }
        });
      }

      if (category === 'products') {
        prodAdv.call("ItemSearch", {SearchIndex: "Appliances", Keywords: `${item}`}, function(err, result) {
          console.log(err);
          if(result['Items']['Item'].length) {
            const extraInfo = result['Items']['Item'][0]['DetailPageURL'];
            res.json({url: extraInfo});
          } else {
            res.json({msg: 'Sorry, no related product found on Amazon'});
          }
        });
      }
    });
  });

  //icon view detais??


  // when a user clicks edit button, will send todo id in req.body.
  todoRoutes.put('/:item', (req, res) => {
    let todoId = req.params.item;
    let itemChange = req.body.newItem;
    const catgChange = req.body.newCatg;

    // need to use or null each parameter:
    // updateTodosByTodoId: function(todoId, itemChange, categChange, completed, callback)
    if (todoId) {
      dataHelper.updateTodosByTodoId(todoId, itemChange, catgChange, null, () => {
        res.json({completed: true});
      });
    } else {
      res.status(400).json({error: 'Invalid request: no todoId to update'});
    }
  });

  // when a user clicks delete button, will send todo id in req.body.
  todoRoutes.delete('/:item', (req, res) => {
    let todoId = req.params.item;
    if (todoId) {
      dataHelper.deleteIndividTodo(todoId, () => {
        res.send(`deleted ${todoId}, go check the database!`);
      });
    } else {
      res.status(400).json({error: 'invalid request: no todoId to delete'});
    }
  });

  // test function to test the backend - delete after done!
  todoRoutes.get('/test', (req, res) => {
    // run http://localhost:8080/user/1/todo/test  in browser!
    dataHelper.getIndividTodo(20, (row) => {
      console.log(row);
      // callback(row);
    });
  });

  return todoRoutes;
};
