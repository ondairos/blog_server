const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { tokenExtractor } = require('../utils/middleware')
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
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

// // token
// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//         return authorization.substring(7)
//     }
//     return null
// }

// express-async-errors eliminates the use of try-catch in ASYNC CODE
blogsRouter.post('/', tokenExtractor, async (request, response) => {
    const body = request.body

    // assign token to variable from request
    const token = request.token
    if (!token) {
        return response.status(401).json({ error: 'token1 is missing or invalid' })
    }
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token2 missing or invalid' })
    }
    // user with token implementation for authentication
    const user = await User.findById(decodedToken.id)

    const blogPost = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlogPost = await blogPost.save()
    user.blogPosts = user.blogPosts.concat(savedBlogPost._id)
    await user.save()

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

// delete blog post only if user id is the creator of the blog post
blogsRouter.delete(':/id', async (request, response) => {

    // get the token
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    // get the user with the token id
    const tokenUserId = decodedToken.id

    const blogPost = await Blog.findById(request.params.id)
    if (!blogPost) {
        return response.status(404).json({ error: 'blog post not found!' })
    }

    if (blogPost.user.toString() === tokenUserId.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } else {
        response.status(401).json({ error: 'unothorized user' })
    }
})

module.exports = blogsRouter