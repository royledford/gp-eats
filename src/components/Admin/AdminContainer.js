import React, { Component } from 'react'

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
