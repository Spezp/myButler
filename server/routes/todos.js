"use strict"

const dataHelper      = require("../lib/database_functions");
const express         = require('express');
const todoRoutes      = express.Router();

module.exports = (dataHelper) => {

  //overview on the home page
  //response with all todos in there category under this user
  //if not log in, AJAX in app.js will receive a false value and create a flash message key = msg, value see below
  //if log in, AJAX in app.js will receive json with key = category, value = number of items
  todoRoutes.get('/categories', (req, res) => {
    if (!req.session.user_id){
      res.json({login: false, msg:'Please log in'});
    } else {
      const overview = {};
      dataHelper.getTodosByCatgsByUserId(req.session.user_id, "movies", (rows) => {
        overview.movies = rows.length;
      });
      dataHelper.getTodosByCatgsByUserId(req.session.user_id, "restaurants", (rows) => {
        overview.restaurants = rows.length;
      });
      dataHelper.getTodosByCatgsByUserId(req.session.user_id, "books", (rows) => {
        overview.books = rows.length;
      });
      dataHelper.getTodosByCatgsByUserId(req.session.user_id, "products", (rows) => {
        overview.products = rows.length;
      });
      res.json(overview);
      // console.log('this is from get overivew home page');
      // res.send('this is from get overivew home page');
  });


  //display all items in four categories for swipes
  todoRoutes.get('/', (req, res) => {
     if (!req.session.user_id){
      res.json({login: false, msg:'Please log in'});
    } else {
      const fullList = [];
      dataHelper.getTodosByCatgsByUserId(req.session.user_id, "movies", (rows) => {
        fullList = rows;
      });
      dataHelper.getTodosByCatgsByUserId(req.session.user_id, "restaurants", (rows) => {
        fullList = fullList.concat(rows);
      });
      dataHelper.getTodosByCatgsByUserId(req.session.user_id, "books", (rows) => {
        fullList = fullList.concat(rows);
      });
      dataHelper.getTodosByCatgsByUserId(req.session.user_id, "products", (rows) => {
        fullList = fullList.concat(rows);
      });
      res.json(fullList);
      // console.log('this is from get fullList for swipes');
      // res.send('this is from get fullList for swipes');

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



  todoRoutes.put('/:item', (req, res) => {

  });

  todoRoutes.delete('/:item', (req, res) => {

  });


  return todoRoutes;
}
