const express = require('express');


const controller = {};

/** TEST MIDDLEWARE */
controller.testFunction = (request, response, next) => {
  console.log('THE CONTROLLER TEST FUNCTION IS WORKING');
  return next();
}

module.exports = controller;