var _ = require('lodash')

const dummy = (blogs) => {
  blogs.forEach(blog => {
    console.log(blog)
  })
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
}

const mostBlogs = (blogs) => {
  const mostAuthors = _
    .chain(blogs)
    .countBy('author')
    .toPairs()
    .last()
    .value()
  return { author: mostAuthors[0], blogs: mostAuthors[1] }
}

const mostLikes = (blogs) => {
  return _
    .chain(blogs)
    .groupBy('author')
    .map((author) => ({
      author: author[0].author,
      likes: _.sumBy(author, 'likes')
    }))
    .maxBy('likes')
    .value()
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
