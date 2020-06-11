const request = require('supertest')
const app = require('./../../src/app')
const knex = require('./../../src/database/connection')

describe('/points endpoint', () => {
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

  it('should insert a new point and return it', async () => {
    const testPoint = {
      name: 'Test name',
      email: 'test@test.com',
      whatsapp: '123456',
      latitude: 0,
      longitude: 0,
      city: 'São Paulo',
      uf: 'SP',
      imageUrl: 'test-image.png',
      items: [1, 2, 3, 4]
    }
    const response = await request(app).post('/points').send(testPoint)

    expect(response.status).toBe(201)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('id')
  })

  it('should responds with a JSON array (get all points)', async () => {
    const data = (await request(app).get('/points')).body
    expect(data).toBeInstanceOf(Array)
  })

  it('should responds with a JSON array (get items of a point)', async () => {
    const data = (await request(app).get('/points/1/items')).body
    expect(data).toBeInstanceOf(Array)
  })

  it('should responds with a JSON object', async () => {
    const data = (await request(app).get('/points/1')).body
    expect(data).toBeInstanceOf(Object)
  })

  it('should responds with a 404 error (get a point)', async () => {
    const response = await request(app).get('/points/0')
    
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message')
  })

  it('should delete an existing point', async () => {
    const response = await request(app).delete('/points/1')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('success', true)
  })

  it('should responds with a 404 error (delete a point)', async () => {
    const response = await request(app).delete('/points/0')

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message')
  })
})

