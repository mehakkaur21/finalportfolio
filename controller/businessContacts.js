const BusinessContact = require('../Models/businessContacts');
exports.getBusinessContacts = (req, res, next) => {
  res.render('authorised/businessContacts', {
    title: 'Business Contacts',
    message:'HEY'
  });
}
exports.postContact=(req,res,next)=>{
  const name = req.body.name;
  const email = req.body.email;
  const contactNumber = req.body.contactNumber;
  const additionalInfo= req.body.additionalInfo;
  const businessContacts = new BusinessContact({
    name:name,
    email:email,
    contactNumber:contactNumber,
    description:additionalInfo
  })
  businessContacts.save();
  console.log(name,email,contactNumber,additionalInfo);
  res.redirect('/contact');
}
