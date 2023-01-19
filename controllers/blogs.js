const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
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

// token
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

// express-async-errors eliminates the use of try-catch in ASYNC CODE
blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
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

module.exports = blogsRouter