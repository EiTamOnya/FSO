import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const updateAnecdote = action.data.anecdote
      return state.map(anecdote => anecdote.id === updateAnecdote.id ? updateAnecdote : anecdote)
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

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = anecdoteService.updateAnecdote({ ...anecdote, votes: anecdote.votes += 1 })
    dispatch({
      type: 'VOTE',
      data: {
        anecdote: updatedAnecdote
      }
    })
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

