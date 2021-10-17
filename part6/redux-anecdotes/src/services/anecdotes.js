import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, id: getId(), votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateAnecdote = async (object) => {
  const updatedUrl = `${baseUrl}/${object.id}`
  const response = await axios.put(updatedUrl, object)
  return response.data
}


export default {
  getAll,
  createNew,
  updateAnecdote
}

