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

// blogsRouter.post('/', (request, response, next) => {
//     const blog = new Blog(request.body)

//     blog
//         .save()
//         .then(result => {
//             response.status(201).json(result)
//         }).catch(error => next(error))
// })

blogsRouter.post('/', async (request, response, next) => {
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

module.exports = blogsRouter