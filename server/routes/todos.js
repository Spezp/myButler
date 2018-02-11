"use strict"

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
      res.json({login: false, msg:'Please log in'});
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
      res.json({login: false, msg:'Please log in'});
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
              res.json(fullList);
            });
          });
        });
      });
    }
  });

  //receive ajax's data in req.body
  //update in db
  //send category and all its items to update display
  todoRoutes.post('/', (req, res) =>{
    //assuming ajax data is querystring with key = text
    if (!req.body.text) {
      res.status(400).json({error: 'invalid request: no data in POST body'})
    }

  });


  //Font-end!! remove data-id, use data-item or item.text() in url
  todoRoutes.get('/:item', (req, res) => {
    // const item = req.params.item;
    // const category = req.body.category;
    const item = 'Muku';
    const category = 'restaurants';
    //const item = 'Star';
    //const category = 'movies';
    //const item = 'Harry';
    //const category = 'books';
    if (category === 'restaurants') {
      const option = {
          hostname: 'api.yelp.com',
          path: `/v3/businesses/search?term=${item}&latitude=51.044270&longitude=-114.062019&limit=2`,
          headers:{
              Authorization: btoken['b']
          }
      };
      let apiResult;
      https.get(option, function(response) {
        response.setEncoding('utf8');
        response.on('error', function(err){
          res.json(err);
        })
        response.on('data', function (data) {
          apiResult = data;
        })
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
          path: `/?apikey=thewdb&t=${item}`,
      };
      let buffer = [];
      https.get(option, function(response) {
        response.setEncoding('utf8');
        response.on('error', function(err){
          console.log(err);
        })
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
      prodAdv.call("ItemSearch", {SearchIndex: "Books", Keywords: `${item}`}, function(err, result) {
        console.log(err);
        if(result['Items']['Item'].length) {
          const extraInfo = result['Items']['Item'][0]['DetailPageURL'];
          res.json({url: extraInfo});
        } else {
          res.json({msg: 'Sorry, no related product found on Amazon'})
        }
      });
      }

  });

  //icon view detais??



  // when a user clicks edit button, will send todo id in req.body.
  // TODO- this is now harcoded. will have to find, then update (with category or item)
  // using GET for testing - TODO - need to change to put
  todoRoutes.get('/:item', (req, res) => {
    // to be deleted
    // TODO - the parameter to update will be sent in the req.body (I think??). now it's hardcoded.
    let todoId = req.params.item;
    let itemChange = 'read Eat Love Pray';

    // need to use or null each parameter:
    // updateTodosByTodoId: function(todoId, itemChange, categChange, completed, callback)
    if (todoId) {
      dataHelper.updateTodosByTodoId(todoId, itemChange, null, null, () => {
        res.send(`updated ${todoId}, go check the database!`);
      })
    } else {
     res.status(400).json({error: 'Invalid request: no todoId to update'});
    }
  });

  // when a user clicks delete button, will send todo id in req.body.
  // todoRoutes.delete('/:item', (req, res) => {     // need to change to the delete route
  // TODO- this is now harcoded in the url. will have to pass it in, then delete item
  todoRoutes.get('/:item', (req, res) => {
    let todoId = req.params.item;
    if (todoId) {
      dataHelper.deleteIndividTodo(todoId, () => {
      res.send(`deleted ${todoId}, go check the database!`);
      })
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
}
