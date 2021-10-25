import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const state = useSelector(state => state)
  return (
    <div className={state.msgClass}>
      {state.text}
    </div>
  )
}

export default Notification