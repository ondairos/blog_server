const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
// const mongoose = require('mongoose')


// blogsRouter.get('/', (request, response) => {
//     Blog
//         .find({})
//         .then(blogs => {
//             response.json(blogs)
//         })
// })

// home route
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

// express-async-errors eliminates the use of try-catch in ASYNC CODE
blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const blogPost = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    const savedBlogPost = await blogPost.save()
    response.status(201).json(savedBlogPost)

})

// get individual id blog post
// express-async-errors eliminates the use of try-catch in ASYNC CODE
blogsRouter.get('/:id', async (request, response) => {

    const blogPost = await Blog.findById(request.params.id)
    if (blogPost) {
        response.json(blogPost)
    } else {
        response.status(404).end()
    }

})


// delete individual blog post id
// express-async-errors eliminates the use of try-catch in ASYNC CODE
blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter