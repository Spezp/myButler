"use strict";

const usersHelper   = require('../lib/usersHelper');
const express       = require('express');
const usersRoutes   = express.Router();
const bcrypt        = require('bcrypt');

module.exports = (usersHelper, bcrypt, session) => {

  //update new user in db, send cookie
  usersRoutes.post("/register", (req, res) => {
    const newUser = {
      email:req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    };
    //check if already registered
    usersHelper.findUser(newUser.email, (user) => {
      if (!user) {
        res.json({isRegistered: true});
      } else {
        usersHelper.addUser(newUser, () => {
          usersHelper.findUser(newUser.email, (user) => {
            req.session.user_id =user[0].id;
            const email = user[0].email;
            res.json({isRegistered: false, email: email});
          });
        });
      }
    });
  });


  //gather login info, compare with db
  usersRoutes.post('/login', (req, res) => {
    usersHelper.findUser(req.body.email, (user) => {
      if(user.length) {
        const user_id = user[0].id;
        const email = user[0].email;
        if (bcrypt.compareSync(req.body.password, user[0].password)) {
          req.session.user_id = user_id;
          res.json({auth: true, email: email});
        } else {
          res.json({auth: false});
        }
      } else {
      res.json({isRegistered: false});
      }
    });
  });

  //app.js ? what do you want to display?
  usersRoutes.post('/logout', (req, res) => {
    req.session = null;
    res.json({login: false});
  });



  //request will be from avatar btn event listener through ajax

  usersRoutes.get('/delete', (req, res) => {
    // const userId = {
    //   id:req.body.id
    // };
    const userId = 1;
    // TODO:  this is a hardcoded userId as we are not passing it into the route just yet - needs to be changed.
    if (userId) {
      usersHelper.deleteUser(userId, () => {});
    }
  });

  // find user in db, in callback, do below
  // response with user's email, avatar, and potentially other info like profile name to be add in the future
  // front-end!!!: will display info in form, placeholder are the info, edit and delet btn,
  usersRoutes.get('/profile', (req, res) => {
    usersHelper.findUser(req.body.eamil, (user) => {

    });
  });

  //triggered by edit btn and send request through ajax
  //update in db ---updateUser func
  //in callback, redirect to route above
  usersRoutes.put('/profile', (req, res) => {

  });

  return usersRoutes;
};
