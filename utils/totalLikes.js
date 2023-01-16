// Define a new totalLikes function that receives a list of blog posts as a parameter. The function returns the total sum of likes in all of the blog posts.
const checkTotalLikes = (blogPosts) => {
    let totalLikesCount = 0
    for (let i = 0; i < blogPosts.length; i++) {
        totalLikesCount = totalLikesCount + blogPosts[i].likes
    }
    return totalLikesCount
}

const findMaxLikesPost = (blogPosts) => {
    let maxLikeBlogPostCount = 0
    let maxLikeBlogPostObject = {}
    for (let i = 0; i < blogPosts.length; i++) {
        if (blogPosts[i].likes > maxLikeBlogPostCount) {
            maxLikeBlogPostObject = {
                title: blogPosts[i].title,
                author: blogPosts[i].author,
                likes: blogPosts[i].likes
            }
            maxLikeBlogPostCount = blogPosts[i].likes
        }
    }
    // console.log(`The blog post with the highest like count is: ${maxLikeBlogPost.title} by ${maxLikeBlogPost.author} with ${maxLikeBlogPost.likes} likes`)
    return maxLikeBlogPostObject
}

// Define a function called mostLikes that receives an array of blogs as its parameter. The function returns the author, whose blog posts have the largest amount of likes. The return value also contains the total number of likes that the author has received:


module.exports = {
    checkTotalLikes,
    findMaxLikesPost
}