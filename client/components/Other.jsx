import React, {Component, PropTypes as T} from 'react'
import {connect} from 'react-redux'
import {callApi} from '../actions'

class Other extends Component {
  static propTypes = {
    callApi: T.func.isRequired,
    hello: T.object
  }

  static fetchData = {
    callApi
  }

  componentWillMount () {
    const {callApi} = this.props
    callApi()
  }

  render () {
    const {api} = this.props

    return <div>
      {api ? api.hello : 'waiting for API response...'}
    </div>
  }
}

const mapStateToProps = ({api}) => ({
  api
})

const mapDispatchToProps = {
  callApi
}

export default connect(mapStateToProps, mapDispatchToProps)(Other)
