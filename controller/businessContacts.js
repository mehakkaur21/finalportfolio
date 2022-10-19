// BUSINESS CONTACTS CONTROLLER
/*
File Name: businessContacts.js
Name: Mehak kaur 
Student ID 301232188
Date 20 October, 2022
*/


const BusinessContact = require('../Models/businessContacts');

// RENDERS THE BUSINESS CONTACTS LIST VIEW WITH FLASH MESSAGES OR WARNINGS IF ANY
exports.getBusinessContacts = (req, res, next) => {
  let message = req.flash('contactDeleted');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  BusinessContact.find()  // FETCHING CONTACTS FROM BUSINESS CONTACTS COLLECTION
    .collation({ locale: 'en', strength: 2 }).sort({ name: 1 }) // SORTING IN ALPHABETICAL ORDER 
    .then(contacts => {
      res.render('authorised/businessContacts', {
        title: 'Business Contacts',
        contacts: contacts,
        message: message
      });
    })

}

// GETS THE DATA POSTED TO CONTACT PAGE AND ADDS IT TO THE DATABASE
exports.postContact = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const contactNumber = req.body.contactNumber;
  const additionalInfo = req.body.additionalInfo;
  // USING  BUSINESS CONTACTS SCHEMA (mongoose)
  const businessContacts = new BusinessContact({
    name: name,
    email: email,
    contactNumber: contactNumber,
    description: additionalInfo
  })
  businessContacts.save(); // MONGOOSE FUNCTION TO SAVE THE DATA AND CREATE NEW CONTACT
  res.redirect('/contact');
}

// FUNCTION FOR DELETING DATA
exports.deleteUser = (req, res, next) => {
  const contactId = req.params.contactId;
  BusinessContact.findByIdAndRemove(contactId)
    .then(result => {
      console.log(result);
      req.flash('contactDeleted', 'Contact Deleted Successfully !!');
      res.redirect('/businessContacts');
    })
    .catch(err => {
      console.log(err);
    })
}

// RENDERS THE EDIT CONTACT VIEW WITH SELECTED CONTACTS DETAILS
exports.getEditContact = (req, res, next) => {
  const contactId = req.params.contactId;
  BusinessContact.findById(contactId)
    .then(contact => {
      res.render('authorised/edit-user', {
        title: 'Edit User',
        contact: contact,
      })
    })
    .catch(err => {
      console.log(err);
    })
}

// UPDATES THE CONTACT SELECTED 
exports.postEditContact = (req, res, next) => {
  const contactId = req.params.contactId;
  // GETTING THE DATA FROM BODY WHEN SUBMIT (EDIT FORM) BTN IS CLICKED
  const updatedName=req.body.name;
  console.log(updatedName);
  const updatedEmail=req.body.email;
  const updatedDesc=req.body.description;
  const updatedContactNumber=req.body.contactNumber;
  req.flash('contactDeleted',`Contact: ${updatedName} Updated Successfully !!` ); // SENDS THE MESSAGE THAT CONTACT HAS BEEN EDITED

  // FINDING THE CONTACT AND OVERWRITING ITS DATA
  BusinessContact.findById(contactId)  // MONGOOSE FUNCTION TO FIND ONE ELEMENT USING ITS ID
  .then(contact=>{
    console.log(contact)
    contact.name=updatedName;
    contact.email=updatedEmail;
    contact.description=updatedDesc;
    contact.contactNumber=updatedContactNumber;
    contact.save();
  })
  .then(res.redirect('/businessContacts'))
  .catch(err=>{
    console.log(err);
  })

}

// RENDERS THE VIEW CONTACT PAGE WITH DATA OF THE SELECTED CONTACT
exports.getContact = (req, res, next) => {
  const contactId = req.params.contactId;
  BusinessContact.findById(contactId)
    .then(contact => {
      console.log(contact);
      res.render('authorised/view-contact', {
        title: 'View Contact',
        contact: contact,
      })
    })
    .catch(err => {
      console.log(err);
    })
}