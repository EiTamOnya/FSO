import React from 'react'
import { connect } from 'react-redux'
import { typeText } from '../reducers/filterReducer'

const Filter = (props) => {
  const value = props.filter

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input type="text" value={value} onChange={(event) => props.typeText(event.target.value)} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = {
  typeText
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)

