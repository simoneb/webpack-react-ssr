import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import {Provider} from'react-redux'
import {Router, browserHistory} from 'react-router'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {ReduxAsyncConnect, reducer as reduxAsyncConnect} from 'redux-connect'

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

const store = createStore(combineReducers({counter, reduxAsyncConnect}), preloadedState, applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
))

ReactDOM.render(
    <Provider store={store} key="provider">
      <Router render={(props) => <ReduxAsyncConnect {...props}/>} history={browserHistory}>
        {routes}
      </Router>
    </Provider>,
    element)
