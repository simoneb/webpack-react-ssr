import React, {Component, PropTypes as T} from 'react'
import {asyncConnect} from 'redux-connect'
import {get} from 'axios'

@asyncConnect([{
  key: 'api',
  promise: () => {
    console.log('fetching api/hello')
    return get(`${global.window ? '' : 'http://localhost:3000'}/api/hello`)
        .then(({data}) => {
          console.log('fetched api/hello')
          return data
        })
        .catch(err => console.error(err));
  }
}])
class Other extends Component {
  static propTypes = {
    api: T.object.isRequired
  }

  render () {
    const {api} = this.props

    return <div>
      {api ? api.hello : 'waiting for API response...'}
    </div>
  }
}

export default Other
