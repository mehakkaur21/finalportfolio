/*
File Name: index.js
Name: Mehak kaur 
Student ID 301232188
Date 20 October, 2022
*/
var express = require('express');
var router = express.Router();

/* GET Home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET Home page. */
router.get('/home', function (req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET About Us page. */
router.get('/about', function (req, res, next) {
  res.render('about', { title: 'About Me' });
});

/* GET Products page. */
router.get('/projects', function (req, res, next) {
  res.render('projects', { title: 'Projects' });
});

/* GET Services page. */
router.get('/services', function (req, res, next) {
  res.render('services', { title: 'Services' });
});

/* GET Contact Us page. */
router.get('/contact', function (req, res, next) {
  res.render('contact', { title: 'Contact Me' });
});

module.exports = router;
