import {combineReducers} from 'redux'

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const api = (state = {}, action) => {
  switch (action.type) {
    case 'API': return action.payload
    default: return state
  }
}

export default combineReducers({ counter, api })