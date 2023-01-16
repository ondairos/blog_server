const blogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 222,
        __v: 0
    }
]

const findMaxLikesPost = (blogPosts) => {
    let maxLikeBlogPostCount = 0
    let maxLikeBlogPostIndex = 0
    for (let i = 0; i < blogPosts.length; i++) {
        if (blogPosts[i].likes > maxLikeBlogPostCount) {
            maxLikeBlogPostIndex = i
            maxLikeBlogPostCount = blogPosts[i].likes
        }
    }
    console.log(`The blog post with the highest like count is: ${blogPosts[maxLikeBlogPostIndex].title} with ${blogPosts[maxLikeBlogPostIndex].likes} likes`)
    return maxLikeBlogPostIndex
}


const mostLikes = (blogs) => {
    let authorsAndLikes = {}
    //iterate over the blogs array and populate the authors and likes object with author names and total likes
    for (let i = 0; i < blogs.length; i++) {
        let currentBlog = blogs[i]
        // check if author already exists in the authors object
        if (authorsAndLikes[currentBlog.author]) {
            // if it does, add the likes to the total likes for that author
            authorsAndLikes[currentBlog.author] += currentBlog.likes
        } else {
            // if not, add the author to the authors object and set the likes to the current blog's likes
            authorsAndLikes[currentBlog.author] = currentBlog.likes
        }
    }
    let maxLikesAuthor = null
    let maxLikes = 0
    // find the author with the most likes
    for (let author in authorsAndLikes) {
        if (authorsAndLikes[author] > maxLikes) {
            maxLikesAuthor = author
            maxLikes = authorsAndLikes[author]
        }
    }
    // return an object with the author and the number of likes they have
    return {
        author: maxLikesAuthor,
        likes: maxLikes
    }
}


console.log(`The author with the most likes(${mostLikes(blogs).likes}) is: ${mostLikes(blogs).author}`)
findMaxLikesPost(blogs)