const express = require('express');
const router= express.Router();
const businessContactsController = require('../controller/businessContacts');
const isAuth=require('../middelwear/is-auth');

// isAuth prevents users that are not logged in to access unauthorised pages 
router.get('/businessContacts',isAuth,businessContactsController.getBusinessContacts);
router.post('/submitContact',businessContactsController.postContact);
router.get('/deleteContact/:contactId',isAuth,businessContactsController.deleteUser);
router.get('/editContact/:contactId',isAuth,businessContactsController.getEditContact);
router.get('/viewContact/:contactId',isAuth,businessContactsController.getContact);
router.post('/editContact/:contactId',isAuth,businessContactsController.postEditContact);
module.exports=router;