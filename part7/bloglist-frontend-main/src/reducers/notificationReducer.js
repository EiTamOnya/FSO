const initialState = { text: null, msgClass: null }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW':
      return { text: action.data.text, msgClass: action.data.msgClass }
    case 'HIDE':
      return initialState
    default:
      return state
  }
}

export const show = (data) => {
  return {
    type: 'SHOW',
    data: data
  }
}


export const hide = () => {
  return {
    type: 'HIDE',
  }
}

export default reducer
