require('dotenv').config()

const PORT = process.env.PORT || 3003
const mongodbUrl = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI

module.exports = {
    mongodbUrl,
    PORT
}