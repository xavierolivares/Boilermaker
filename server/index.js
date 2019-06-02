//create server/index.js file use express
const express = require('express')
const path = require('path')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const {db} = require('./db')

//install and use morgan
app.use(morgan('dev'))

//need a json and url encoded parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//serve up static files from public folder
app.use(express.static(path.join(__dirname, '..', 'public'))) 

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

// db.sync()
//   .then(() => {
//     console.log('The database is synced!')
//     app.listen(PORT, () => console.log(`
//       Listening on port ${PORT}
//       http://localhost:3000/
//     `))
//   })

db.sync()
  .then(() => {
    console.log('db is synced')
    app.listen(port, () => {
    console.log("Knock, knock");
    console.log("Open up the door, it's real");
    console.log(`X gon give it to ya on port ${port}`);
  });
})
