import React, { useState, useEffect, useRef } from 'react'
import _ from 'lodash'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [])

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      await blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    } catch (exception) {
      showMessage({ text: exception.response.data.error, class: 'error' })
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const response = await blogService.postNew(blogObject)
      setBlogs(blogs.concat(response))
      showMessage({
        text: `A new blog ${blogObject.title}, by ${blogObject.author} added!`,
        class: 'notification'
      })
    } catch (exception) {
      showMessage({ text: exception.response.data.error, class: 'error' })
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm addBlog={addBlog} />
    </Togglable>

  )

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload();
  }

  const showMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const addLike = async (blogObject) => {
    blogObject.likes += 1
    await blogService.putBlog(blogObject)
    showMessage({
      text: `Blog ${blogObject.title}, by ${blogObject.author} liked!`,
      class: 'notification'
    })
    setBlogs(blogs)
  }

  const deleteBlog = async (blogObject) => {
    const userResponse = window.confirm('Delete blog?')
    if (userResponse) {
      await blogService.deleteBlog(blogObject.id)
      showMessage({
        text: `Blog ${blogObject.title}, by ${blogObject.author} deleted!`,
        class: 'notification'
      })
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
    }
  }

  return (
    <div>
      <Notification message={message} />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={() => logOut()}>logout</button>
          <h2>blogs</h2>
          {blogForm()}
          {_.sortBy(blogs, 'likes').reverse().map(blog =>
            <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog} />
          )}
        </div>
      }
    </div>
  )
}

export default App