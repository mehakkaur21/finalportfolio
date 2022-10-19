// Handling User Routes
/*
File Name: users.js
Name: Mehak kaur 
Student ID 301232188
Date 20 October, 2022
*/

var express = require('express');

var router = express.Router();
const userController = require('../controller/users');

router.get('/login', userController.getLogin); // RENDERS THE LOGIN PAGE 

router.post('/login', userController.postLogin); // POSTS THE LOGIN FORM AND CHECK OF USER CREDENTIALS ARE VALID

router.post('/logout', userController.postLogout); // LOGS THE USER OUT AND ENDS THE SESSION

module.exports = router;
