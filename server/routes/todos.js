"use strict"

const dataHelper      = require("../lib/database_functions");
const express         = require('express');
const todoRoutes      = express.Router();

module.exports = (dataHelper, https) => {

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
  //send category and its all items to update display
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
    const item = 'north-india-restaurant-san-francisco';
    const category = 'movies';
    if (category === 'restaurants') {
      const option = {
          hostname: 'api.yelp.com',
          path: `/v3/businesses/${item}`,
          headers:{
              Authorization: 'Bearer TsJGuoxAQeB8zt7NNM6G-bzR6ZCio2Shj0nfhZmt2J9PC0__tbHoIDb68VfN_Z1vt9rvV9DQnFSqHyAZ5BZ8SEEdUeHuqPEj_H18dCq1CRnfbjBto4h-gqgoc5h7WnYx'
          }
      };
      https.get(option, function(response) {
        response.setEncoding('utf8');
        response.on('error', function(err){
          res.json(err);
        })
        response.on('data', function (data) {
          res.json(data);
        });
      });
    }
    if (category === 'movies') {
      const option = {
          hostname: 'www.omdbapi.com',
          path: '/?apikey=thewdb&t=pop\%20fiction',
          // headers:{
          //     Authorization: 'Bearer TsJGuoxAQeB8zt7NNM6G-bzR6ZCio2Shj0nfhZmt2J9PC0__tbHoIDb68VfN_Z1vt9rvV9DQnFSqHyAZ5BZ8SEEdUeHuqPEj_H18dCq1CRnfbjBto4h-gqgoc5h7WnYx'
          // }
      };
      https.get(option, function(response) {
        response.setEncoding('utf8');
        response.on('error', function(err){
          res.json(err);
        })
        response.on('data', function (data) {
          res.json(data);
        });
      });
    }
    if (category === 'products') {
      const option = {
          hostname: 'webservices.amazon.com',
          path: '/onca/xml?Service=AWSECommerceService&Operation=ItemSearch&SubscriptionId=AKIAJNGUN7PHID6ARE4A&AssociateTag=mybutler-20&SearchIndex=Books&Keywords=Instant',
          // headers:{
          //     Authorization: 'Bearer TsJGuoxAQeB8zt7NNM6G-bzR6ZCio2Shj0nfhZmt2J9PC0__tbHoIDb68VfN_Z1vt9rvV9DQnFSqHyAZ5BZ8SEEdUeHuqPEj_H18dCq1CRnfbjBto4h-gqgoc5h7WnYx'
          // }
      };
      https.get(option, function(response) {
        response.setEncoding('utf8');
        response.on('error', function(err){
          res.json(err);
        })
        response.on('data', function (data) {
          res.json(data);
        });
      });
      }

  });

  //icon view detais??



  // when a user clicks edit button, will send todo id in req.body.
  // TODO- this is now harcoded. will have to find, then update (with category or item)
  // todoRoutes.put('/:item', (req, res) => {

  // when a user clicks delete button, will send todo id in req.body.
  // todoRoutes.delete('/:item', (req, res) => {     // need to change to the delete route
  // TODO- this is now harcoded in the url. will have to pass it in, then delete item
  todoRoutes.get('/:item', (req, res) => {
    let todoId = req.params.item;
    console.log('item:', todoId);
    if (todoId) {
      dataHelper.deleteIndividTodo(todoId, () => {
      res.send(`deleted ${todoId}, go check the database!`);
      })
    } else {
      res.status(400).json({error: 'invalid request: no todoId to delete'})
    }
  });

  todoRoutes.get('/test', (req, res) => {
    // run http://localhost:8080/user/1/todo/test  in browser!
    dataHelper.getIndividTodo(20, (row) => {
      console.log(row);
      // callback(row);
    });
  });

  return todoRoutes;
}
