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
  console.log(name, email, contactNumber, additionalInfo);
  res.redirect('/contact');
}

exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  BusinessContact.findByIdAndRemove(userId)
    .then(result => {
      console.log(result);
      req.flash('contactDeleted', 'Contact Deleted Successfully !!');
      res.redirect('/businessContacts');
    })
    .catch(err => {
      console.log(err);
    })
}