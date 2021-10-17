import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const App = () => {
  const dispatchType = (type) => {
    store.dispatch({
      type: type
    })
  }

  return (
    <div>
      <button onClick={() => dispatchType('GOOD')}>good</button>
      <button onClick={() => dispatchType('OK')}>neutral</button>
      <button onClick={() => dispatchType('BAD')}>bad</button>
      <button onClick={() => dispatchType('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)