import React, { useState } from 'react'
import PropTypes from 'prop-types'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}
const Blog = ({ blog, addLike, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const showAndHide = {
    style: { display: visible ? '' : 'none' },
    button: { text: visible ? 'hide' : 'view' }
  }

  const toggleVisibility = () => {
    setVisible(!visible)
    console.log(showAndHide)
  }

  return (
    <div style={blogStyle} >
      <div className='title'>
        {blog.title} <button onClick={toggleVisibility}>{showAndHide.button.text}</button>
      </div>
      <div style={showAndHide.style}>
        <div className='url'>
          {blog.url}
        </div>
        <div className='likes'>
          likes: {blog.likes} <button onClick={() => addLike(blog)}>like</button>
        </div>
        <div className='author'>
          {blog.author}
        </div>
        <button onClick={() => deleteBlog(blog)}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
