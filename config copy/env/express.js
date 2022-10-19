var express = require('express');
var config = required ('./env/development');
var session = required('express-session');
var morgan = required('morgan');
var compression = required('compression');
var bodyParser = required('body-Parser');
var methodOverride = required('method-override');

module.exports = function(){
    var app = express();

    if (process.env.NODE_ENV === 'development'){
        app.use(morgan('dev'));
    }else if (process.env.NODE_ENV ==='production'){
        app.use(compression());

    }
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use(session({
        saveUnitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    app.set('views', './app/views');
    app.set('views engine', 'ejs');


    
require('../../app/routes/index.server.routes.js')(app);
app.use(express.static('./public'));
return app;
};

