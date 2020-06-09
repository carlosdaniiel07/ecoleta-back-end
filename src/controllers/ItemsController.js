const ItemService = require('./../services/ItemService')
const itemService = new ItemService()

class ItemsController {
  constructor() {
    
  }

  async index(req, res) {    
    const items = await itemService.getAll()
    const parsedItems = items.map(item => {
      return { id: item.id, title: item.title, imageUrl: `/uploads/${item.image}` }
    })

    return res.json(parsedItems)
  }

  async show(req, res) {
    const { id } = req.params
    const item = await itemService.getById(id)

    if (!item) {
      return res.status(404).json({ message: `Not found a item with id ${id}` })
    }
    
    return res.json(item)
  }

  async insert(req, res) {
    const { title, image } = req.body
    const item = await itemService.save({ title, image })
    
    return res.status(201).json(item)
  }

  async delete(req, res) {
    const { id } = req.params
    const item = await itemService.deleteById(id)

    if (!item) {
      return res.status(404).json({ message: `Not found a item with id ${id}` })
    }

    return res.json({ success: true })
  }
}

module.exports = ItemsController
