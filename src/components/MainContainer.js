import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DataService from '../services/DataService'

import Main from './Main'

export default class MainContainer extends Component {
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
      eats: [],
    }
  }

  componentWillMount() {
    DataService.getEats().then(eats => {
      console.log(atob(eats.content))
    })
  }

  render() {
    return <Main />
  }
}
