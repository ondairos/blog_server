const Blog = require('../models/blog')
const User = require('../models/user')

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

// creating a database object ID that does not belong to any note object in the database.
const nonExistingId = async () => {
    const blogPost = new Blog({ title: 'placeholder', author: 'testAuthor', url: 'testUrl', likes: 11 })
    await blogPost.save()
    await blogPost.remove()

    return blogPost._id.toString()
}

const blogPostsInDb = async () => {
    const blogPosts = await Blog.find({})

    return blogPosts.map(element => element.toJSON)
}


// USERS in Database
const usersInDb = async () => {
    const users = await User.find({})
    return users.map(element => element.toJSON())
}

module.exports = {
    initialBlogPosts, nonExistingId, blogPostsInDb, usersInDb,
}