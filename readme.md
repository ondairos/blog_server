# Bloglist API

This is a simple API for a blog list application built with Node.js, Express, and Mongoose. It allows for the creation, retrieval, and deletion of blog entries.

## Getting Started
## Prerequisites

Node.js
MongoDB

## Install the dependencies

    npm install

## Start the server

    npm start

## Endpoints

- GET /api/blogs - retrieves all blog entries
- POST /api/blogs - creates a new blog entry (requires a JSON body with title, author, url, and likes properties)
- DELETE /api/blogs/:id - deletes a specific blog entry by id

## Built With

- Node.js - JavaScript runtime
- Express - web framework for Node.js
- Mongoose - MongoDB object modeling for Node.js
- Cors - middleware for handling Cross-Origin Resource Sharing

## Author

John Kanti

## License

This project is licensed under the MIT License