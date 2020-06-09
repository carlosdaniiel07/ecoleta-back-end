const express = require('express')
const routes = express.Router()

const ItemsController = require('./controllers/ItemsController')
const PointsController = require('./controllers/PointsController')

const itemsController = new ItemsController()
const pointsController = new PointsController()

// main route
routes.get('/', (req, res) => {
  return res.json({
    success: true,
    time: new Date().getTime()
  })
})

// items
routes.get('/items', itemsController.index)
routes.get('/items/:id', itemsController.show)
routes.post('/items', itemsController.insert)
routes.delete('/items/:id', itemsController.delete)

// points
routes.get('/points', pointsController.index)
routes.get('/points/:id', pointsController.show)
routes.post('/points', pointsController.insert)
routes.delete('/points/:id', pointsController.delete)

module.exports = routes