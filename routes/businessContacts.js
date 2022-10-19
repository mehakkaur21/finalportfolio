const express = require('express');
const router= express.Router();
const businessContactsController = require('../controller/businessContacts');
const isAuth=require('../middelwear/is-auth');
router.get('/businessContacts',isAuth,businessContactsController.getBusinessContacts);

router.post('/submitContact',businessContactsController.postContact);
router.get('/deleteUser/:contactId',businessContactsController.deleteUser);
router.get('/edit-user/:contactId',businessContactsController.deleteUser);
module.exports=router;