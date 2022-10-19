let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

// IMPORTING PACKAGE MONGOOSE npm install --save mongoose
const mongoose = require('mongoose');
// IMPORTING USER SCHEMA FROM  user.js IN Models DIRECTORY
const User = require('./Models/user');
// IMPORTING bcryptjs to encrypt the password
const bcryptjs = require('bcryptjs');


let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler




app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;
// CONNECTING TO MONGODB USING MONGOOSE
mongoose.connect('mongodb+srv://MehakKaur:Mehak123@cluster0.8wazwtw.mongodb.net/portfolio?retryWrites=true&w=majority')
  .then(result => {
    console.log('Connected !!');
    User.findOne()  // CHECKING IF THERE IS ANY USER DATA STORED IN DATABASE
      .then(user => {
        const password = '123456';
        bcryptjs.hash(password, 12).then(hashedPassword => {
          // IF NO USER FOUND IN DATABASE, WE WILL CREATE OUR FIRST USER
          if (!user) {
            const user = new User({
              username: 'Mehak',
              password: hashedPassword
            });
            user.save()
              .then(result => {
                console.log(result);
              })
          }
        })
      })
  })
  .catch(err => {
    console.log('Some Error Occured In Connecting To The Database: ' + err);
  })