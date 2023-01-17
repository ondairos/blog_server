const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const config = require('../utils/config')

// import the Express application from the app.js module and wrap it with the supertest function into a so-called superagent object
const api = supertest(app)
// supertest port: if the server is not already listening for connections then it is bound to an ephemeral port for you so there is no need to keep track of ports.

beforeAll(async () => {
    await mongoose.connect(config.mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
})

test('blog posts are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)



test('there are two blog posts', async () => {
    console.log('Making GET request to /api/blogs')
    const response = await api.get('/api/blogs')
    console.log('Response received:', response.body)
    expect(response.body).toHaveLength(3)
})

test('the first blog post is about', async () => {
    console.log('Making GET request to /api/blogs')
    const response = await api.get('/api/blogs')
    console.log('Response received:', response.body[0])
    expect(response.body[0].title).toBe('The earth spirit')
})

afterAll(() => {
    mongoose.connection.close()
})