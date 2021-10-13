import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { typeText } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    dispatch(typeText(event.target.value))
  }

  const value = useSelector(state => state.filter)

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input type="text" value={value} onChange={handleChange} />
    </div>
  )
}

export default Filter
