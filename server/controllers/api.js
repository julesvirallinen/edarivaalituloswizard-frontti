const dataRouter = require('express').Router()
var fs = require('fs')

dataRouter.get('/sample', (request, response) => {
  let rawdata = fs.readFileSync('data/yearlyData.json')
  let data = JSON.parse(rawdata)

  response.json(data)
})

dataRouter.get('/candidate', (request, response) => {
  let rawdata = fs.readFileSync('data/byCandidate.json')
  let data = JSON.parse(rawdata)

  response.json(data)
})

module.exports = dataRouter
