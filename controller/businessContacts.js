const BusinessContact = require('../Models/businessContacts');

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
exports.postContact = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const contactNumber = req.body.contactNumber;
  const additionalInfo = req.body.additionalInfo;
  const businessContacts = new BusinessContact({
    name: name,
    email: email,
    contactNumber: contactNumber,
    description: additionalInfo
  })
  businessContacts.save();
  res.redirect('/contact');
}

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
exports.postEditContact = (req, res, next) => {
  const contactId = req.params.contactId;
  // GETTING THE DATA FROM BODY WHEN SUBMIT (EDIT FORM) BTN IS CLICKED
  const updatedName=req.body.name;
  console.log(updatedName);
  const updatedEmail=req.body.email;
  const updatedDesc=req.body.description;
  const updatedContactNumber=req.body.contactNumber;
  req.flash('contactDeleted',`Contact :${updatedName} Updated Successfully !!` );

  // FINDING THE CONTACT AND OVERWRITING ITS DATA
  BusinessContact.findById(contactId)
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