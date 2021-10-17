import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      let updatedAnecdote = state.find(obj => obj.id === id)
      updatedAnecdote.votes += 1
      return state.map(anecdote => anecdote.id === id ? updatedAnecdote : anecdote)
    case 'INIT_ANECDOTES':
      return action.data
    case 'CREATE':
      return state.concat(action.data)
    default:
      return state
  }
}


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id: id
    }
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export default reducer

