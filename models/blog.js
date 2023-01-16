const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

// // set the schema to not show the __v and to show the id value as string
// blogSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//         returnedObject.id = returnedObject._id.toString()
//         delete returnedObject._id
//         delete returnedObject.__v
//         delete returnedObject.password
//     }
// })

module.exports = mongoose.model('Blog', blogSchema)