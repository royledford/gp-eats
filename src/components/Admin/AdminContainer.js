import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Header from '../Header'
import Admin from './Admin'
import DataService from '../../services/DataService'

export default class AdminContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eats: [],
    }
  }

  componentWillMount() {
    DataService.getEats().then(eats => {
      // const result = atob(eats.content)
      // const parsedResult = JSON.parse(eats)
      // const formattedEats = parsedResult.eats
      this.setState({ eats: eats })
    })
  }

  render() {
    return (
      <div>
        <Header />
        <Admin eats={this.state.eats} />
      </div>
    )
  }
}
