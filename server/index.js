//create server/index.js file use express
const express = require('express')
const path = require('path')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

//install and use morgan
app.use(morgan('dev'))

//need a json and url encoded parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//serve up static files from public folder
app.use(express.static(path.join(__dirname, '..', './public'))) 

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
app.listen(port, function () {
  console.log("Knock, knock");
  console.log("Who's there?");
  console.log(`Your server, listening on port ${port}`);
});