import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Search from './Search'

export default class SearchContainer extends Component {
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
    return <Search />
  }
}
