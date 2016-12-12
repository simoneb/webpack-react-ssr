import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import {INCREMENT, DECREMENT} from '../actions'

class Counter extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired
  }

  incrementIfOdd = () => {
    if (this.props.value % 2 !== 0) {
      this.props.onIncrement()
    }
  }

  incrementAsync = () => {
    setTimeout(this.props.onIncrement, 1000)
  }

  render () {
    const {value, onIncrement, onDecrement, children} = this.props
    return (
        <div>
          <p>
            Clicked: {value} times
            {' '}
            <button onClick={onIncrement}>
              +
            </button>
            {' '}
            <button onClick={onDecrement}>
              -
            </button>
            {' '}
            <button onClick={this.incrementIfOdd}>
              Increment if odd
            </button>
            {' '}
            <button onClick={this.incrementAsync}>
              Increment async
            </button>
          </p>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  value: state.counter
})

const mapDispatchToProps = {
  onIncrement: INCREMENT,
  onDecrement: DECREMENT
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
