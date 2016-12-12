import qs from 'qs'
import {Server} from 'hapi'
import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import inert from 'inert'
import {Provider} from 'react-redux'
import {renderToString} from 'react-dom/server'
import {match, RouterContext} from 'react-router'
import {notFound, internal} from 'boom'
import thunkMiddleware from 'redux-thunk'
import {map, compact, flow, get, flatMap, values} from 'lodash/fp'

import counterApp from './client/reducers'
import routes from './client/routes'

const server = new Server()

server.connection({port: 3000})

server.register(inert, err => {
  if (err) throw err

  server.route({
    method: 'GET',
    path: '/api/hello',
    handler: (request, reply) => {
      setTimeout(() => reply({hello: 'world'}), 2000)
    }
  })

  server.route({
    method: 'GET',
    path: '/{params*}',
    handler: handleRender
  })
})

function handleRender (request, reply) {
  match({routes, location: request.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      reply(internal(error))
    } else if (redirectLocation) {
      reply.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {

      const params = qs.parse(request.query)
      const counter = parseInt(params.counter, 10) || 0

      const store = createStore(counterApp, {counter}, applyMiddleware(
          thunkMiddleware, // lets us dispatch() functions
      ))

      console.log('fetching data')

      Promise.all(flow(
          map(get('fetchData')),
          compact,
          flatMap(values),
          map(f => store.dispatch(f()))
      )(renderProps.components)).then(() => {
        console.log('fetched data')

        // You can also check renderProps.components or renderProps.routes for
        // your "not found" component or route respectively, and send a 404 as
        // below, if you're using a catch-all route.
        const html = renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>)

        const preloadedState = store.getState()

        reply(renderFullPage(html, preloadedState))
      })
    } else {
      reply(notFound())
    }
  })

}

function renderFullPage (html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for Security isues with this approach:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
        <script src="/index.js"></script>
      </body>
    </html>
    `
}

server.start(err => {
  if (err) throw err
  console.log(`Server running at ${server.info.uri}`)
})
