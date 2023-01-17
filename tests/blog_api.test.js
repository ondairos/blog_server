/* eslint-disable no-trailing-spaces */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blog = require('../models/blog')
// const config = require('../utils/config')

// import the Express application from the app.js module and wrap it with the supertest function into a so-called superagent object
const api = supertest(app)
// supertest port: if the server is not already listening for connections then it is bound to an ephemeral port for you so there is no need to keep track of ports.

// beforeAll(async () => {
//     await mongoose.connect(config.mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
// })

const initialBlogPosts = [
    {
        'title': 'TEST: The One spirit',
        'author': '231Z',
        'url': 'first_blog_post',
        'likes': 22
    },
    {
        'title': 'The two spirit',
        'author': '231Z',
        'url': 'second_blog_post',
        'likes': 11
    },
    {
        'title': 'The three spirit',
        'author': '231Z',
        'url': 'third_blog_post',
        'likes': 3
    },
]

// clear database and add three test blog posts
beforeEach(async () => {
    await blog.deleteMany({})
    let blogObject = new blog(initialBlogPosts[0])
    await blogObject.save()
    blogObject = new blog(initialBlogPosts[1])
    await blogObject.save()
    blogObject = new blog(initialBlogPosts[2])
    await blogObject.save()
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
    
    expect(response.body).toHaveLength(initialBlogPosts.length)
})

test('a specific blog post is within the returned blog posts', async () => {
    console.log('Making GET request to /api/blogs')
    const response = await api.get('/api/blogs')

    const blogTitles = response.body.map(element => element.title)
    expect(blogTitles).toContain('The two spirit')
})

afterAll(() => {
    mongoose.connection.close()
})