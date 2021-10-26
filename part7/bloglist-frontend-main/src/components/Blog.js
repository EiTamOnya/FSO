import React from 'react'


const Blog = ({ blog, addLike }) => {

  return (
    <div>
      <h1>{blog.title}</h1>
      <div className='url'>
        {blog.url}
      </div>
      <div className='likes'>
        likes: {blog.likes} <button onClick={() => addLike(blog)}>like</button>
      </div>
      <div className='author'>
        Added by: {blog.author}
      </div>
    </div>
  )
}


export default Blog
