"use strict";

const express = require('express');
const usersRoutes  = express.Router();



module.exports = (usersHelper, bcrypt, session) => {

  //gather register info, hash, save to db
  //and send session, redirect to user profile page
  //register information sent in GET request in the query string to avoid forms
  //e.g. localhost:8080/user/register?userName=Lijing_Wang&password=123456
  //TODO!! double check if get or post in finalized project
  usersRoutes.get("/register", (req, res) => {
    // const userName = req.params.userName;
    // const hashedPassword = bcrypt.hashSync(req.params.password, 10);
    // //assuming db will return the user row that just add in
    // usersHelper.addUser(userName, hashedPassword, (row) => {
    //   req.session.user_id = row.user_id;
    //   res.redirect(`/user/${row.user_id}`);
    res.send('from register route');
    });


  //gather login info, compare with db
  //send session and redirect to home page
  //log in information sent in GET request in the query string to avoid forms
  //e.g. localhost:8080/user/login?userName=Lijing_Wang&password=123456
  //TODO!! double check if get or post in finalized project
  usersRoutes.get('/login', (req, res) => {
    // const userName = req.params.userName;
    // usersHelper.findUser(user, (row) => {
    //   //assuming user has attribute named password
    //   const hashedPassword = row.password;
    // });
    // if (bcrypt.hashSync(req.params.password) === hashedPassword) {
    // usersHelper.findUser(user, (row) => {
    //   req.session.user_id = row.user_id;
    //   res.redirect('/')
    res.send('from login route');

    }
  });


  return usersRoutes;
}
