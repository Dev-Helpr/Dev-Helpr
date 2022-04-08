const express = require('express');


const controller = {};

/** TEST MIDDLEWARE */
controller.testFunction = (request, response) => {
  console.log('THE CONTROLLER TEST FUNCTION IS WORKING');
}

module.exports = controller;