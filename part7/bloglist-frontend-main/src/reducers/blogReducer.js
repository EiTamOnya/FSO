import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'LIKE':
      const updatedBlog = action.data.blog
      return state.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
    case 'INIT_BLOGS':
      return action.data
    case 'CREATE':
      return state.concat(action.data)
    case 'DELETE':
      const deletedBlog = action.data
      return state.filter(blog => blog.id !== deletedBlog.id)
    default:
      return state
  }
}


export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = blogService.putBlog({ ...blog, likes: blog.likes += 1 })
    dispatch({
      type: 'LIKE',
      data: {
        blog: updatedBlog
      }
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.postNew(blog)
    dispatch({
      type: 'CREATE',
      data: newBlog
    })
  }
}

export const deleteBlogAction = (blog) => {
  return async dispatch => {
    await blogService.deleteBlog(blog.id)
    dispatch({
      type: 'DELETE',
      data: blog
    })
  }
}

export default reducer

