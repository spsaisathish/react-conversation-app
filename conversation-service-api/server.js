const express = require('express')

// use process.env variables to keep private variables,
// be sure to ignore the .env file in github
require('dotenv').config()

// Express Middleware
const helmet = require('helmet') // creates headers that protect from attacks (security)
const bodyParser = require('body-parser') // turns response into usable format
const cors = require('cors')  // allows/disallows cross-site communication
const morgan = require('morgan') // logs requests

// db Connection w/ Heroku
// const db = require('knex')({
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: true,
//   }
// });

// db Connection w/ localhost
var db = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'postgres',
    password : 'postgres',
    database : 'conversation-app'
  }
});

// Controllers - aka, the db queries
const main = require('./controllers/main')

// App
const app = express()

// App Middleware
const whitelist = ['http://localhost:3001']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(morgan('combined')) // use 'tiny' or 'combined'

// App Routes - Auth
app.get('/', (req, res) => res.send('hello world'))
app.get('/crud', (req, res) => main.getTableData(req, res, db))
app.post('/crud', (req, res) => main.postTableData(req, res, db))
app.put('/crud', (req, res) => main.putTableData(req, res, db))
app.delete('/crud', (req, res) => main.deleteTableData(req, res, db))
app.get('/crud/getCategoryList', (req, res) => main.getCategoryList(req, res, db))
app.post('/crud/saveCategory', (req, res) => main.saveCategory(req, res, db))
app.put('/crud/updateCategory', (req, res) => main.updateCategory(req, res, db))
app.delete('/crud/deleteCategory', (req, res) => main.deleteCategory(req, res, db))
app.get('/crud/getTopicList', (req, res) => main.getTopicList(req, res, db))
app.post('/crud/saveTopic', (req, res) => main.saveTopic(req, res, db))
app.put('/crud/updateTopic', (req, res) => main.updateTopic(req, res, db))
app.delete('/crud/deleteTopic', (req, res) => main.deleteTopic(req, res, db))
app.get('/crud/getQuestionList', (req, res) => main.getQuestionList(req, res, db))
app.post('/crud/saveQuestion', (req, res) => main.saveQuestion(req, res, db))
app.put('/crud/updateQuestion', (req, res) => main.updateQuestion(req, res, db))
app.delete('/crud/deleteQuestion', (req, res) => main.deleteQuestion(req, res, db))

// App Server Connection
app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}`)
})