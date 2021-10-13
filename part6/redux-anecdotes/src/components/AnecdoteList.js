import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showMessage, hideMessage } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const displayAndHideVoteNotification = (id) => {
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(showMessage(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(hideMessage())
    }, 5000)
  }

  const vote = (id) => {
    dispatch(voteAnecdote(id))
    displayAndHideVoteNotification(id)
  }

  return (
    <div>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
