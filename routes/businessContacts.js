const express = require('express');
const router= express.Router();
const businessContactsController = require('../controller/businessContacts');
const isAuth=require('../middelwear/is-auth');
router.get('/businessContacts',isAuth,businessContactsController.getBusinessContacts);

router.post('/submitContact',businessContactsController.postContact);

module.exports=router;