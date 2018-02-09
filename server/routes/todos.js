"use strict"

const dataHelper      = require("./server/lib/database_functions");
const express         = require('express');
const todoRoutes      = express.Router();

module.exports = (dataHelper) => {
  todoRoutes.get('/', (req, res) => {

  });

  todoRoutes.post('/', (req, res) =>{

  });

  todoRoutes.get('/:category', (req, res) => {

  });

  todoRoutes.put('/:item', (req, res) => {

  });

  todoRoutes.delete('/:item', (req, res) => {

  });




  return todoRoutes;
}
