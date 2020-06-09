exports.up = function(knex) {
  return knex.schema.createTable('point_items', table => {
    table.primary(['point_id', 'item_id'])

    table.integer('point_id').references('id').inTable('points').notNullable()
    table.integer('item_id').references('id').inTable('items').notNullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('point_items')
}