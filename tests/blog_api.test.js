const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

// import the Express application from the app.js module and wrap it with the supertest function into a so-called superagent object
const api = supertest(app)
// supertest port: if the server is not already listening for connections then it is bound to an ephemeral port for you so there is no need to keep track of ports.


test('blog posts are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)

afterAll(() => {
    mongoose.connection.close()
})

// Both tests store the response of the request to the response variable, and unlike the previous test that used the methods provided by supertest for verifying the status code and headers
test('there are two blog posts', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)
})

test('the first blog post is about', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].title).toBe('The athletic spirit')
})