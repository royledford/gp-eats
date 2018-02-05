import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Header from '../Header'
import Admin from './Admin'

export default class AdminContainer extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    someProp: PropTypes.string,
  }
  static defaultProps = {
    someProp: 'someValue',
  }

  constructor(props) {
    super(props)
    this.state = {
      someState: true,
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Admin />
      </div>
    )
  }
}
