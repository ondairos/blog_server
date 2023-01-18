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
    try {
        const savedBlogPost = await blogPost.save()
        response.status(201).json(savedBlogPost)
    } catch (error) {
        next(error)
    }
})

// get individual id blog post
blogsRouter.get('/:id', async (request, response, next) => {
    try {
        const blogPost = await Blog.findById(request.params.id)
        if (blogPost) {
            response.json(blogPost)
        } else {
            response.status(404).end()
        }
    } catch (error) {
        next(error)
    }
})


// delete individual blog post id
blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (error) {
        next(error)
    }
})

module.exports = blogsRouter