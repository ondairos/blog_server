const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

// import the Express application from the app.js module and wrap it with the supertest function into a so-called superagent object
const api = supertest(app)

test('blog posts are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

afterAll(() => {
    mongoose.connection.close()
})