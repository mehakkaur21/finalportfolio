var express = require('express');

var router = express.Router();
const userController = require('../controller/users');

router.get('/login',userController.getLogin);

router.post('/login',userController.postLogin);

router.post('/logout',userController.postLogout);

module.exports = router;
