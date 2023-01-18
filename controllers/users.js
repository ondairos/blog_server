const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// get all users
usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

// create user
usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    // custom validator for unique field
    const existingUser = await User.findOne({ username })
    if (existingUser) {
        return response.status(400).json({
            error: 'username must be unique'
        })
    }

    // bcrypt usage
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter