"use strict";

const express = require('express');
const usersRoutes  = express.Router();
const todoHelper = require('../lib/database_functions')

module.exports = (knex) => {

  //register and save to db
  //register information sent in GET request in the query string to avoid forms
  ///localhost:8080/user/register?userName=Lijing_Wang&password=123456
  usersRoutes.get("/register", (req, res) => {
    const userName = req.params.userName;
    const password = req.params.password;
    usersHelper.addUser(userName, password, (result) => {
      req.session.user_id = userName;
    });

  return router;
}
