import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = (props) => {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault();
    blogService.postNew(inputs)
    setInputs({})
    blogService.getAll().then(blogs =>
      props.setBlogs(blogs))
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>create new</h2>
      <div>
        title
        <input
          type="text"
          value={inputs.title || ''}
          name="title"
          onChange={handleChange}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={inputs.author || ''}
          name="author"
          onChange={handleChange}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={inputs.url || ''}
          name="url"
          onChange={handleChange}
        />
      </div>
      <button type="submit">submit</button>
    </form>
  )
}

export default BlogForm