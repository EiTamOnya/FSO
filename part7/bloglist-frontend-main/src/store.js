import { createStore } from 'redux'

import notificationReducer from './reducers/notificationReducer'

const store = createStore(notificationReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export default store