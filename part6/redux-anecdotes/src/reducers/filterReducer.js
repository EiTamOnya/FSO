const initialState = ''

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TYPE':
      return action.data.text
    default:
      return state
  }
}

export const typeText = (text) => {
  return {
    type: 'TYPE',
    data: {
      text: text
    }
  }
}

export default reducer
