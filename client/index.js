import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from'react-redux'
import {Router, browserHistory} from 'react-router'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import counter from './reducers'
import routes from './routes'

let element = document.getElementById('root')

if (!element) {
  element = document.createElement('div')
  element.id = 'root'
  document.body.appendChild(element)
}

const preloadedState = window.__PRELOADED_STATE__

const loggerMiddleware = createLogger()

const store = createStore(counter, preloadedState, applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
))

const render = () => ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        {routes}
      </Router>
    </Provider>,
    element)

render()
