import React, { useState } from 'react'

const Blog = ({ blog, addLike, addComment }) => {
  const [inputs, setInputs] = useState({})
  const [comments, setComments] = useState(blog.comments)

  const handleChange = (event) => {
    const value = event.target.value
    setInputs({ text: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(inputs)
    const comment = await addComment(inputs, blog.id)
    setComments(comments.concat(comment))
    setInputs({})
  }

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
        <form onSubmit={handleSubmit}>
          <input type='text' onChange={handleChange}></input>
          <button>add comment</button>
        </form>
        <ul>
          {comments.map(comment =>
            <li key={comment.id}>{comment.text}</li>
          )}
        </ul>
      </div>
    </div>
  )
}


export default Blog
