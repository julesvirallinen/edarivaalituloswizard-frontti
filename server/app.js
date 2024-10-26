const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(express.static('build'))



const dataRouter = require('./controllers/api')
app.use('/api/', dataRouter)



app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

module.exports = app
