const express = require('express');
const router= express.Router();
const businessContactsController = require('../controller/businessContacts');
const isAuth=require('../middelwear/is-auth');
router.get('/businessContacts',isAuth,businessContactsController.getBusinessContacts);


module.exports=router;