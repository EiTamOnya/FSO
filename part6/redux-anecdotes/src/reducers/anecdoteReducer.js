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


export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
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
  return {
    type: 'CREATE',
    data: anecdote
  }
}

export default reducer

