const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 3 },
    author: { type: String, required: true, minlength: 2 },
    url: { type: String },
    likes: { type: Number },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Blog', blogSchema)