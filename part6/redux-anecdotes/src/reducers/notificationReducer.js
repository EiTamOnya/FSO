const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.data.text
    case 'HIDE':
      return initialState
    default:
      return state
  }
}

export const showMessage = (text, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW',
      data: {
        text: text
      }
    })
    setTimeout(() => {
      dispatch(hideMessage())
    }, seconds * 1000)
  }
}

export const hideMessage = () => {
  return {
    type: 'HIDE',
  }
}

export default reducer
