import React, { useState } from 'react'

const Counter = ({ value }) => (
  <p>has {value} votes</p>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 })

  const updateVotes = () => {
    const copy = { ...votes }
    copy[selected] += 1;
    setVotes(copy)
  }

  const maxVotes = () => {
    let [max, index] = [0, 0];
    for (const key in votes) {
      if (votes[key] > max) {
        max = votes[key];
        index = key;
      }
    }
    return index;
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <Counter value={votes[selected]} />
      <div>
        <Button handleClick={() => updateVotes()} text="vote" />
        <Button handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text="next anecdote" />
      </div>
      <h1>Anecdote with the most votes</h1>
      {anecdotes[maxVotes()]}
      <Counter value={votes[maxVotes()]} />
    </div>
  )
}

export default App