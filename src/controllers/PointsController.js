const PointService = require('./../services/PointService')
const pointService = new PointService()

class PointsController {
  constructor() {

  }
  
  async index(req, res) {
    const { city, uf, items } = req.query
    
    if (city && uf && items) {
      return res.json(await pointService.getAllBySearch({
        city: city,
        uf: uf,
        items: items.split(',').map(item => item.trim())
      }))
    } else {
      return res.json(await pointService.getAll())
    }
  }

  async show(req, res) {
    const { id } = req.params
    const point = await pointService.getById(id)

    if (!point) {
      return res.status(404).json({ message: `Not found a point with id ${id}` })
    }

    return res.json(point)
  }

  async showItems(req, res) {
    const { id } = req.params;
    return res.json(await pointService.getItemsByPoint(id))
  }

  async insert(req, res) {
    const { name, email, whatsapp, latitude, longitude, city, uf, imageUrl, items } = req.body
    const point = await pointService.save({
      name, email, whatsapp, latitude, longitude, city, uf, imageUrl
    }, items)

    return res.status(201).json(point)
  }

  async delete(req, res) {
    const { id } = req.params
    const point = await pointService.deleteById(id)

    if (!point) {
      return res.status(404).json({ message: `Not found a point with id ${id}` })
    }

    return res.json({ success: true })
  }
}

module.exports = PointsController