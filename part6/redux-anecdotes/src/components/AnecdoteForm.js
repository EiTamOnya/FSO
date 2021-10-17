import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { showMessage } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {


  const displayAndHideAddNotification = (content) => {
    props.showMessage(`you added '${content}'`, 5)
  }


  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    displayAndHideAddNotification(content)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  showMessage
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)