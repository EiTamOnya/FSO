import React, { useState } from 'react'

const Statistics = ({ good, bad, neutral }) => {

  if (good + bad + neutral > 0) {
    return (
      <div>
        <Statistic value={good} text="good" />
        <Statistic value={neutral} text="neutral" />
        <Statistic value={bad} text="bad" />
        <Statistic value={good + neutral + bad} text="all" />
        <Statistic value={(good - bad) / (good + neutral + bad)} text="average" />
        <Statistic value={`${(good / (good + neutral + bad) * 100).toString()} %`} text="positive" />
      </div>)
  }
  else return (<p>No feedback given</p>)
}

const Statistic = ({ value, text }) => <div>{text} {value}</div>

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
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App