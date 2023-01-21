// const User = require('../models/user')
const logger = require('./logger')
// const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({
            error: 'malformatted id'
        })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({
            error: error.message
        })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'invalid token' })
    }

    logger.error(error.message)

    next(error)
}

// eslint-disable-next-line no-unused-vars
// This code doesn't need to use the "async" keyword because it doesn't contain any asynchronous code that would need to be awaited.
const tokenExtractor = (request, response, next) => {
    console.log('headers:', request.headers)
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
        console.log('token:', request.token)
    }
    next()
}

// THIS CODE NEEDS CHANGES DOESN'T WORK SENTS DOUBLE HEADERS
//user extractor to use for the identity of the user who is doing the operations in blogs.js
// we need async because User.findById is a promise
// const userExtractor = async (request, response, next) => {
//     // request.headers.Authorization ???
//     const token = request.token
//     if (!token) {
//         response.status(401).json({ message: 'token not found!' })
//     }
//     const decodedToken = jwt.verify(token, process.env.SECRET)
//     const foundUser = await User.findById(decodedToken.id)
//     if (!foundUser) {
//         response.status(401).json({ message: 'Invalid Token!' })
//     }
//     request.user = foundUser
//     next()
// }


module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    // userExtractor
}