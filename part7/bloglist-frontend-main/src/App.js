import React, { useState, useEffect, useRef } from 'react'
import _ from 'lodash'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { show, hide } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, deleteBlogAction } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'


const App = () => {
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const dispatch = useDispatch()


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      dispatch(initializeBlogs())
    }
  }, [dispatch])

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
      dispatch(initializeBlogs())
    } catch (exception) {
      showMessage({ text: exception.response.data.error, msgClass: 'error' })
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      dispatch(createBlog(blogObject))
      showMessage({
        text: `A new blog ${blogObject.title}, by ${blogObject.author} added!`,
        msgClass: 'notification'
      })
    } catch (exception) {
      showMessage({ text: exception.response.data.error, msgClass: 'error' })
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm addBlog={addBlog} />
    </Togglable>

  )

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  const showMessage = (message) => {
    dispatch(show(message))
    setTimeout(() => {
      dispatch(hide())
    }, 3000)
  }

  const addLike = async (blogObject) => {
    dispatch(likeBlog(blogObject))
    showMessage({
      text: `Blog ${blogObject.title}, by ${blogObject.author} liked!`,
      msgClass: 'notification'
    })
  }

  const deleteBlog = async (blogObject) => {
    console.log(blogObject)
    const userResponse = window.confirm('Delete blog?')
    if (userResponse) {
      dispatch(deleteBlogAction(blogObject))
      showMessage({
        text: `Blog ${blogObject.title}, by ${blogObject.author} deleted!`,
        msgClass: 'notification'
      })
    }
  }

  return (
    <div>
      <Notification />
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