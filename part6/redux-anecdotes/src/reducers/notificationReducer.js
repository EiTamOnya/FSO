const initialState = { text: null, timeoutId: null }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW':
      return { text: action.data.text, timeoutId: action.data.timeoutId }
    case 'HIDE':
      return { ...state, text: null }
    case 'CLEARTIMEOUT':
      return { ...state, timeoutId: null }
    default:
      return state
  }
}

export const showMessage = (text, seconds) => {
  return async dispatch => {
    const timeoutId = setTimeout(() => {
      dispatch(hideMessage())
    }, seconds * 1000)
    dispatch({
      type: 'SHOW',
      data: {
        text: text,
        timeoutId: timeoutId
      }
    })
  }
}

export const clearCurrentTimeout = (timeoutId) => {
  clearTimeout(timeoutId)
  return {
    type: 'CLEARTIMEOUT',
  }
}

export const hideMessage = () => {
  return {
    type: 'HIDE',
  }
}

export default reducer
