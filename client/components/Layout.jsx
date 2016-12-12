import React, {Component, PropTypes as T} from 'react'
import {Link} from 'react-router'

export class Layout extends Component {
  static propTypes = {
    children: T.element.isRequired
  }

  render () {
    const {children} = this.props

    return (
        <div>
          <nav>
            <Link to="/">Home</Link>
            {' '}
            <Link to="/other">Other</Link>
          </nav>
          {children}
        </div>
    )
  }
}
