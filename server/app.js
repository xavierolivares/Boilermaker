//create server/index.js file use express
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

//install and use morgan
app.use(morgan('dev'))

//serve up static files from public folder
app.use(express.static(path.join(__dirname, '../public')))

//need a json and url encoded parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api', require('./apiRoutes'))