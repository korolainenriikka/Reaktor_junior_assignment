const supertest = require('supertest')
const app = require('./index')

const proxy = supertest(app)

test('valid api endpoint returns data', async () => {
  await proxy
    .get('/products/gloves')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('invalid api endpoint throws error', async () => {
  await proxy
    .get('/products/trousers')
    .expect(500)
})
