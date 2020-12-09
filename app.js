//any time you see require it is a middleware
var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const authenticate = require('./authenticate');

//connecting to the router files
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users'); //current working directory and go to routes folder and use user.js, 

function auth(req, res, next) {
    console.log(req.session);

    if (!req.session.user) {
        const err = new Error('You are not authenticated!');
        err.status = 401;
        return next(err);
    } else {
        if (req.session.user === 'authenticated') {
            return next();
        } else {
            const err = new Error('You are not authenticated!');
            err.status = 401;
            return next(err);
        }
    }
}

const campsiteRouter = require('./routes/campsiteRouter');
const promotionRouter = require('./routes/promotionRouter');
const partnerRouter = require('./routes/partnerRouter');

var app = express(); // use express middleware, import and call it here

const mongoose = require('mongoose'); //import mongoose middleware

const url = 'mongodb://localhost:27017/nucampsite';//This is how you make a connection to MongoDB, use this database, if database doesn't exist then create it
const connect = mongoose.connect(url, {//connects client to mongodb from our node application
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

connect.then(() => console.log('Connected correctly to server'), //if no issues occur go to line 37, else go to line 38
    err => console.log(err)
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); //Default for express, front-end client

app.use(logger('dev'));
app.use(express.json()); //grabs JSON object using express
app.use(express.urlencoded({ extended: false }));//it is parse data and put into data structure in the form of JSON object inside a JSON object ("key", "value")
//app.use(cookieParser('12345-67890-09876-54321')); //grab the cookie

app.use(session({
    name: 'session-id',
    secret: '12345-67890-09876-54321',
    saveUninitialized: false,
    resave: false,
    store: new FileStore()
}));

app.use(passport.initialize());
app.use(passport.session());

function auth(req, res, next) {
    console.log(req.session);

    if (!req.session.user) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            const err = new Error('You are not authenticated!');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            return next(err);
        }

        const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
        const user = auth[0];
        const pass = auth[1];
        if (user === 'admin' && pass === 'password') {
            req.session.user = 'admin';
            return next(); // authorized
        } else {
            const err = new Error('You are not authenticated!');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            return next(err);
        }
    } else {
        if (req.session.user === 'admin') {
            return next();
        } else {
            const err = new Error('You are not authenticated!');
            err.status = 401;
            return next(err);
        }
    }
}

// function auth(req, res, next) {
//   if (!req.signedCookies.user) {
//       const authHeader = req.headers.authorization;
//       if (!authHeader) {
//           const err = new Error('You are not authenticated!');
//           res.setHeader('WWW-Authenticate', 'Basic');
//           err.status = 401;
//           return next(err);
//       }

//       const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
//       const user = auth[0];
//       const pass = auth[1];
//       if (user === 'admin' && pass === 'password') {
//           res.cookie('user', 'admin', {signed: true});
//           return next(); // authorized
//       } else {
//           const err = new Error('You are not authenticated!');
//           res.setHeader('WWW-Authenticate', 'Basic');
//           err.status = 401;
//           return next(err);
//       }
//   } else {
//       if (req.signedCookies.user === 'admin') {
//           return next();
//       } else {
//           const err = new Error('You are not authenticated!');
//           err.status = 401;
//           return next(err);
//       }
//   }
// }

// function auth(req, res, next) {
//   console.log(req.headers);
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//       const err = new Error('You are not authenticated!');
//       res.setHeader('WWW-Authenticate', 'Basic');
//       err.status = 401;
//       return next(err);
//   }

//   const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
//   const user = auth[0];
//   const pass = auth[1];
//   if (user === 'admin' && pass === 'password') {
//       return next(); // authorized
//   } else {
//       const err = new Error('You are not authenticated!');
//       res.setHeader('WWW-Authenticate', 'Basic');      
//       err.status = 401;
//       return next(err);
//   }
// }

// app.use('/', indexRouter);
// //app.use('/dishes', dishRouter) //if a user goes to the starting of the endpoint. Use the variable in line 15
// app.use('/users', usersRouter);

// function auth(req, res, next) {
//     console.log(req.user);

//     if (!req.user) {
//         const err = new Error('You are not authenticated!');
//         err.status = 401;
//         return next(err);
//     } else {
//         return next();
//         }
//     }


// app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));//Directory for all your static files HTML, CSS, JS

app.use('/campsites', campsiteRouter);
app.use('/promotions', promotionRouter);
app.use('/partners', partnerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// Secure traffic only
app.all('*', (req, res, next) => {
    if (req.secure) {
        return next();
    } else {
        console.log(`Redirecting to: https://${req.hostname}:${app.get('secPort')}${req.url}`);
        res.redirect(301, `https://${req.hostname}:${app.get('secPort')}${req.url}`);
    }
});

module.exports = app;
