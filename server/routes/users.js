"use strict";

const usersHelper   = require('../lib/usersHelper');
const express       = require('express');
const usersRoutes   = express.Router();
const bcrypt        =require('bcrypt');



module.exports = (usersHelper, bcrypt, session) => {

  //update new user in db, send cookie
  //???redirect to which page?
  usersRoutes.post("/register", (req, res) => {
    const newUser = {
      email:req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    };
    usersHelper.addUser(newUser,
      () => {usersHelper.findUser(req.body.email, (user) => {
        req.session.user_id =user[0].user_id;
        res.redirect('/user/1/todo/categories');
      })});
  });


  //gather login info, compare with db
  //send session and redirect to home page
  usersRoutes.post('/login', (req, res) => {
    usersHelper.findUser(req.body.email, (user) => {
      //assuming user has attribute named password
      const hashedPassword = user.password;
      const user_id = user.id;
    });
    if (bcrypt.CompareSync(req.query.password) === hashedPassword) {
        req.session.user_id = user_id;
        res.redirect('/')
      // res.send(`from login route and query are ${req.query.userName}`);
      };
  });



  return usersRoutes;
};
