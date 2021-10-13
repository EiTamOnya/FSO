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

export const showMessage = (text) => {
  return {
    type: 'SHOW',
    data: {
      text: text
    }
  }
}

export const hideMessage = () => {
  return {
    type: 'HIDE',
  }
}

export default reducer
