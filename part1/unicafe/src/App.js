import React, { useState } from 'react'

const Display = ({ value, text }) => <div>{text} {value}</div>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Display value={good} text="good" />
      <Display value={neutral} text="neutral" />
      <Display value={bad} text="bad" />
      <Display value={good + neutral + bad} text="all" />
      <Display value={(good - bad) / (good + neutral + bad)} text="average" />
      <Display value={`${(good / (good + neutral + bad) * 100).toString()} %`} text="positive" />
    </div>
  )
}

export default App