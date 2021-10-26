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
      <div>
        <h2>comments</h2>
        <ul>
          {blog.comments.map(comment =>
            <li key={comment.id}>{comment.text}</li>
          )}
        </ul>
      </div>
    </div>
  )
}


export default Blog
