const express = require('express')
const routes = express.Router()

const validate = require('./middlewares/validation.middleware')

const ItemsController = require('./controllers/ItemsController')
const PointsController = require('./controllers/PointsController')
const { body, param } = require('express-validator')

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

routes.get('/items/:id', validate([
  param('id').isInt()
]), itemsController.show)

routes.post('/items', validate([
  body('title').notEmpty({ ignore_whitespace: true }),
  body('image').notEmpty({ ignore_whitespace: true })
]), itemsController.insert)

routes.delete('/items/:id', validate([
  param('id').isInt()
]), itemsController.delete)

// points
routes.get('/points', pointsController.index)

routes.get('/points/:id', validate([
  param('id').isInt()
]), pointsController.show)

routes.get('/points/:id/items', validate([
  param('id').isInt()
]), pointsController.showItems)

routes.post('/points', validate([
  body('name').notEmpty({ ignore_whitespace: true }),
  body('email').isEmail(),
  body('whatsapp').notEmpty({ ignore_whitespace: true }),
  body('latitude').isDecimal(),
  body('longitude').isDecimal(),
  body('city').notEmpty({ ignore_whitespace: true }),
  body('uf').notEmpty({ ignore_whitespace: true }).isLength({ min: 2, max: 2 }),
  body('imageUrl').notEmpty({ ignore_whitespace: true }),
  body('items').isArray({ min: 1 })
]), pointsController.insert)

routes.delete('/points/:id', validate([
  param('id').isInt()
]), pointsController.delete)

module.exports = routes