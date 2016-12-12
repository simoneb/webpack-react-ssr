import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import {Layout} from './components/Layout'
import Counter from './components/Counter'
import Other from './components/Other'

export default (
      <Route path="/" component={Layout}>
        <IndexRoute component={Counter} />
        <Route path="other" component={Other} />
      </Route>
)
