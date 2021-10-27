import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get(baseUrl, config)
  return response.data
}

const postNew = async (data) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, data, config)
  return response.data
}

const putBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const url = baseUrl + '/' + blog.id

  const response = await axios.put(url, blog, config)
  return response.data
}

const deleteBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }

  const url = baseUrl + '/' + blogId

  const response = await axios.delete(url, config)
  return response
}

const addComment = async (data, blogId) => {
  const config = {
    headers: { Authorization: token },
  }

  const url = `${baseUrl}/${blogId}/comments`

  const response = await axios.post(url, data, config)
  return response.data
}


export default { getAll, setToken, postNew, putBlog, deleteBlog, addComment }
