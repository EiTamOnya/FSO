import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import userService from './services/users'
import blogService from './services/blogs'
import { show, hide } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, deleteBlogAction } from './reducers/blogReducer'
import { loginUser } from './reducers/loginReducer'
import {
  Switch,
  Route,
  useRouteMatch,
  Link
} from "react-router-dom"
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'


const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function fetchUsers() {
      const response = await userService.getAll()
      setUsers(response)
    }

    fetchUsers()
  }, [])

  const blogFormRef = useRef()
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(initializeBlogs())
    async function fetchUsers() {
      const response = await userService.getAll()
      setUsers(response)
    }

    fetchUsers()
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
      dispatch(loginUser({
        username, password,
      }))
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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const navStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    background: '#CDCDCD',
  }

  const buttonStyle = {
    background: 'white'
  }

  const matchObjectUser = useRouteMatch('/users/:id')
  const userMatch = matchObjectUser
    ? users.find(user => user.id === matchObjectUser.params.id)
    : null

  const matchObjectBlog = useRouteMatch('/blogs/:id')
  const blogMatch = matchObjectBlog
    ? blogs.find(blog => blog.id === matchObjectBlog.params.id)
    : null

  return (
    <Container>
      <Notification />
      {user === null ?
        loginForm() :
        <div>
          <div style={navStyle}>
            <Button style={buttonStyle}>
              <Link to="/">blogs</Link>
            </Button>
            <Button style={buttonStyle}>
              <Link to="/users/">users</Link>
            </Button>
            {user.name} logged-in
            <Button style={buttonStyle} onClick={() => logOut()}>logout</Button>
          </div>
          <Switch>
            <Route path="/users/:id">
              <User user={userMatch} />
            </Route>
            <Route path="/users">
              <Users users={users} />
            </Route>
            <Route path="/blogs/:id">
              <Blog blog={blogMatch} addLike={addLike} addComment={blogService.addComment} />
            </Route>
            <Route path="/">
              <h2>blogs</h2>
              {blogForm()}
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    {_.sortBy(blogs, 'likes').reverse().map(blog =>
                      <TableRow style={blogStyle} key={blog.id}>
                        <TableCell>
                          <Link to={`/blogs/${blog.id}`} key={blog.id}>{blog.title}</Link>
                        </TableCell>
                        <TableCell>
                          {blog.author}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Route>
          </Switch>
        </div>
      }
    </Container >
  )
}

export default App