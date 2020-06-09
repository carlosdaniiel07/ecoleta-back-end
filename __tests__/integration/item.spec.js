const request = require('supertest')
const app = require('./../../src/app')
const knex = require('./../../src/database/connection')

describe('/items endpoint', () => {
  beforeAll(async () => {
    console.log('[INFO] Running database migrations and seeds')

    await knex.migrate.latest()
    await knex.seed.run()

    console.log('[INFO] Test database created')
  })

  afterAll(async () => {
    console.log('[INFO] Dropping test database')

    await knex.migrate.rollback({}, true)

    console.log('[INFO] Test database dropped')
  })

  it('should responds with a JSON array', async () => {
    const response = (await request(app).get('/items')).body
    expect(response).toBeInstanceOf(Array)
  })

  it('should responds with a JSON object', async () => {
    const response = (await request(app).get('/items/1')).body
    expect(response).toBeInstanceOf(Object)
  })

  it('should responds with a 404 (get item)', async () => {
    const response = await request(app).get('/items/0')
    
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message')
  })

  it('should insert a new item and return it', async () => {
    const testItem = { title: 'This is a test Item', image: 'This is a test image' }
    const response = await request(app).post('/items').send(testItem)

    expect(response.status).toBe(201)
    
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('title', testItem.title)
    expect(response.body).toHaveProperty('image', testItem.image)
  })

  it('should delete an item', async () => {
    const response = await request(app).delete('/items/1')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('success', true)
  })

  it('should responds with a 404 (delete item)', async () => {
    const response = await request(app).delete('/items/0')

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message')
  })
})