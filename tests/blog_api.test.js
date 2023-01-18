/* eslint-disable no-trailing-spaces */
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const blog = require('../models/blog')
// const config = require('../utils/config')

// import the Express application from the app.js module and wrap it with the supertest function into a so-called superagent object
const api = supertest(app)
// supertest port: if the server is not already listening for connections then it is bound to an ephemeral port for you so there is no need to keep track of ports.

// beforeAll(async () => {
//     await mongoose.connect(config.mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
// })

// clear database and add three test blog posts
beforeEach(async () => {
    await blog.deleteMany({})
    let blogObject = new blog(helper.initialBlogPosts[0])
    await blogObject.save()
    blogObject = new blog(helper.initialBlogPosts[1])
    await blogObject.save()
    blogObject = new blog(helper.initialBlogPosts[2])
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

    expect(response.body).toHaveLength(helper.initialBlogPosts.length)
})

test('a specific blog post is within the returned blog posts', async () => {
    console.log('Making GET request to /api/blogs')
    const response = await api.get('/api/blogs')

    const blogTitles = response.body.map(element => element.title)
    expect(blogTitles).toContain('The two spirit')
})

// test for checking if a note valid blog post can be added
test('a valid blog post can be added', async () => {
    const newBlog = {

        'title': 'TEST: New Blog Title',
        'author': '231Z',
        'url': 'another_blog_post',
        'likes': 23
    }


    //creates a new request with the "api.post('/api/blogs')" method provided by the "supertest" library. This method is used to send a POST request to the specified endpoint.
    await api.post('/api/blogs')
        // supertest method "send()" method to attach a JSON object "newBlog" as the request body.
        .send(newBlog)
        // "expect()" method to check that the "Content-Type" header of the response is "application/json", indicating that the response body is in JSON format.
        .expect(201)
        //"expect()" method to check that the HTTP status code of the response is 201, indicating that the resource was created successfully.
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const allBlogTitles = response.body.map(element => element.title)

    expect(response.body).toHaveLength(helper.initialBlogPosts.length + 1)
    expect(allBlogTitles).toContain('TEST: New Blog Title')
})

// test that verifies that a note without content will not be saved into the database.
// test('blogPost without content is not added', async () => {
//     const newBlogPost = {
//         url: 'test_url'
//     }

//     await api.post('/api/blogs')
//         .send(newBlogPost)
//         .expect(400)

//     const response = await api.get('/api/blogs')

//     expect(response.body).toHaveLength(helper.initialBlogPosts.length)
// })


// TESTS FOR DELETING AND GETTING INDIVIDUAL ROUTES (~!convert to Blog!~)
// test('a specific note can be viewed', async () => {
//     const notesAtStart = await helper.notesInDb()

//     const noteToView = notesAtStart[0]

//     const resultNote = await api.get(`/api/notes/${noteToView.id}`).expect(200).expect('Content-Type', /application\/json/)
//     const processedNoteToView = JSON.parse(JSON.stringify(noteToView))

//     expect(resultNote.body).toEqual(processedNoteToView)
// })

// test('a note can be deleted', async () => {
//     const notesAtStart = await helper.notesInDb()
//     const noteToDelete = notesAtStart[0]

//     await api.delete(`/api/notes/${noteToDelete.id}`).expect(204)
//     const notesAtEnd = await helper.notesInDb()

//     expect(notesAtEnd).toHaveLength(
//         helper.initialNotes.length - 1
//     )

//     const contents = notesAtEnd.map(r => r.content)

//     expect(contents).not.toContain(noteToDelete.content)
// })

afterAll(() => {
    mongoose.connection.close()
})