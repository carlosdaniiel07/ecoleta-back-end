exports.up = function(knex) {
  return knex.schema.createTable('points', table => {
    table.increments('id').primary()

    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('whatsapp').notNullable()
    table.decimal('latitude').notNullable()
    table.decimal('longitude').notNullable()
    table.string('city').notNullable()
    table.string('uf', 2).notNullable()
    table.string('imageUrl').notNullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('points')
}