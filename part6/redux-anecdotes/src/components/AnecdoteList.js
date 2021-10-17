import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { clearCurrentTimeout, showMessage } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const displayAndHideVoteNotification = (anecdote) => {
    dispatch(clearCurrentTimeout(notification.timeoutId))
    dispatch(showMessage(`you voted '${anecdote.content}'`, 5))
  }

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    displayAndHideVoteNotification(anecdote)
  }

  const filterAnecdotes = () => {
    return filter === ''
      ? anecdotes
      : anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      );
  }

  return (
    <div>
      {filterAnecdotes().sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
