const express = require('express');
const db = require('../model/devHelprModels');
require('dotenv').config();


const controller = {};



/** TEST MIDDLEWARE */
controller.testFunction = (request, response, next) => {
  console.log('THE CONTROLLER TEST FUNCTION IS WORKING');
  return next();
}

controller.testGetDB = (req, res, next) => {
  db.query('SELECT * FROM "public"."users"')
    .then(results => {
      console.log(process.env.ELEPHANTSQL_URL)
      res.locals.userList = results.rows;
      return next();
    })
    .catch(error => next({ message: `There was an error using testGetDB middleware: ${error}`}));
}

module.exports = controller;