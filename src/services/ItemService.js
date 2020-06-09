const knex = require('./../database/connection')

class ItemService {
  constructor() {

  }

  async getAll() {
    const data = await knex('items').select('*')
    return data
  }

  async getById(id) {
    const data = await knex('items').where({ id }).select('*').first()
    return data
  }

  async save(item) {
    const id = (await knex('items').insert(item))[0]
    return { id, ...item }
  }

  async deleteById(itemId) {
    const item = await this.getById(itemId)

    if (!item) {
      return null
    }

    await knex('items').where({ id: itemId }).del()
    
    return item
  }
}

module.exports = ItemService