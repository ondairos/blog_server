// Define a new totalLikes function that receives a list of blog posts as a parameter. The function returns the total sum of likes in all of the blog posts.
const checkTotalLikes = (blogPosts) => {
    let totalLikesCount = 0
    for (let element in blogPosts) {
        totalLikesCount = totalLikesCount + element.likes
    }
    return totalLikesCount
}

module.exports = {
    checkTotalLikes
}