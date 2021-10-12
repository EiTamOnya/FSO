import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  const updatedState = {
    good: 13,
    ok: 14,
    bad: 15
  }


  const updateStateAndConfirm = (type, updateState, startState = initialState) => {
    const action = {
      type: type
    }
    const state = startState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      ...startState,
      ...updateState
    })
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    updateStateAndConfirm('GOOD', { good: 1 })
  })

  test('bad is incremented', () => {
    updateStateAndConfirm('BAD', { bad: 1 })
  })

  test('OK is incremented', () => {
    updateStateAndConfirm('OK', { ok: 1 })
  })

  test('Stats are reset', () => {
    updateStateAndConfirm('ZERO', initialState, updatedState)
  })
})
