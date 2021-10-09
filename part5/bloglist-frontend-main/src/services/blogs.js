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

const putBlog = async (data) => {
  const config = {
    headers: { Authorization: token },
  }

  const url = baseUrl + '/' + data.id

  const response = await axios.put(url, data, config)
  return response.data
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, postNew, putBlog }
