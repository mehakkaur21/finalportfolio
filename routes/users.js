var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('authorised/login',{ title: 'Login' })
  console.log('HEY');
  console.log('SESSION')
});



module.exports = router;
