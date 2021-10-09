import React, { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}
const Blog = ({ blog }) => {
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
      <div>
        {blog.title} <button onClick={toggleVisibility}>{showAndHide.button.text}</button>
      </div>
      <div style={showAndHide.style}>
        <div>
          {blog.url}
        </div>
        <div>
          likes: {blog.likes}
        </div>
        <div>
          {blog.author}
        </div>
      </div>
    </div>
  )
}


export default Blog