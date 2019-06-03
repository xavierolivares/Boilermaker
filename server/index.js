//create server/index.js file use express
const express = require('express')
const path = require('path')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const {db} = require('./db')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const dbStore = new SequelizeStore({db:db})
const passport = require('passport');

dbStore.sync()
//install and use morgan
app.use(morgan('dev'))

//need a json and url encoded parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//serve up static files from public folder
app.use(express.static(path.join(__dirname, '..', 'public'))) 

//storing a sessionPassword in another location?
// app.use(async (req, res, next) => {
//   const sessionSecrets = await Secret.getSessionSecrets()
//   session({
//     secret: sessionSecrets,
//     resave: false,
//     saveUninitialized: false
//   })
// })
session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  store: dbStore,
  resave: false,
  saveUninitialized: false
});

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

app.use('/api', require('./apiRoutes'))

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.use(function (err, req, res, next) {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!

db.sync()
  .then(() => {
    console.log('db is synced')
    app.listen(port, () => {
    console.log("Knock, knock");
    console.log("Open up the door, it's real");
    console.log(`Port ${port}`);
  });
})
