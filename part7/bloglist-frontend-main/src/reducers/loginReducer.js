import loginService from '../services/login'
import blogService from '../services/blogs'

const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
let initialState = null

if (loggedUserJSON) {
  initialState = JSON.parse(loggedUserJSON)
  blogService.setToken(initialState.token)
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}

export const loginUser = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    blogService.setToken(user.token)
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export default reducer

