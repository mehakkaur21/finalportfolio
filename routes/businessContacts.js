// Handling Business Contacts List Routes
/*
File Name: businessContacts.js
Name: Mehak kaur 
Student ID 301232188
Date 20 October, 2022
*/
const express = require('express');
const router = express.Router();
const businessContactsController = require('../controller/businessContacts');
const isAuth = require('../middelwear/is-auth');

// isAuth prevents users that are not logged in to access unauthorised pages 
// If a user tries to access an authorised page using links then user will be redirected to login page with error message


router.get('/businessContacts', isAuth, businessContactsController.getBusinessContacts); // Renders the business contacts list page

router.post('/submitContact', businessContactsController.postContact); // Gets data from contact form 
router.get('/deleteContact/:contactId', isAuth, businessContactsController.deleteUser); // Deletes the contact
router.get('/editContact/:contactId', isAuth, businessContactsController.getEditContact); // Edits the contact
router.get('/viewContact/:contactId', isAuth, businessContactsController.getContact); // View the contact 
router.post('/editContact/:contactId', isAuth, businessContactsController.postEditContact); // Saves the edited contact data to mongodb server
module.exports = router;