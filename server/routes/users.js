"use strict";

const usersHelper   = require('../lib/usersHelper');
const express       = require('express');
const usersRoutes   = express.Router();
const bcrypt        =require('bcrypt');



module.exports = (usersHelper, bcrypt, session) => {

  //update new user in db, send cookie
  //???redirect to which page?
  //need to test user id
  usersRoutes.post("/register", (req, res) => {
    const newUser = {
      email:req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    };
    usersHelper.addUser(newUser,
      () => {usersHelper.findUser(req.body.email, (user) => {
        req.session.user_id =user[0].id;
        res.redirect('/user/1/todo/categories');
      })});
  });


  //gather login info, compare with db
  //send session and redirect to home page
  //need to test user id
  usersRoutes.post('/login', (req, res) => {
    usersHelper.findUser(req.body.email, (user) => {
      const user_id = user[0].id;
      if (bcrypt.compareSync(req.body.password, user[0].password)) {
        req.session.user_id = user_id;
        res.redirect('/user/1/todo/categories');
      };
    });

  });



  return usersRoutes;
};
