const knex = require('./../database/connection')

class PointService {
  constructor() {

  }

  async getAll() {
    const data = await knex('points').select('*')
    return data
  }

  async getById(id) {
    const data = await knex('points').where({ id }).select('*').first()
    return data
  }

  async getAllBySearch({ city, uf, items }) {
    const data = await knex('points')
      .innerJoin('point_items', 'points.id', '=', 'point_items.point_id')
      .where({ city, uf }).whereIn('point_items.item_id', items)
      .distinct()
      .select('points.*')

    return data
  }

  async getItemsByPoint(pointId) {
    const data = await knex('items')
      .innerJoin('point_items', 'items.id', '=', 'point_items.item_id')
      .where({ 'point_id': pointId })
      .select(['items.id', 'items.title'])
    
    return data
  }

  async save(point, items) {
    const trx = await knex.transaction()
    
    const pointId = (await trx('points').insert(point))[0]
    const pointItems = await trx('point_items').insert(items.map(item => {
      return { point_id: pointId, item_id: item }
    }))

    await trx.commit()

    return { id: pointId, ...point }
  }

  async deleteById(pointId) {
    const point = await this.getById(pointId)
    const trx = await knex.transaction()

    if (!point) {
      return null
    }

    await trx('point_items').where({ point_id: pointId }).del()
    await trx('points').where({ id: pointId }).del()

    await trx.commit()

    return point
  }
}

module.exports = PointService