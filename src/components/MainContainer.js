import React, { Component } from 'react'
import DataService from '../services/DataService'
import Main from './Main'

export default class MainContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eats: [],
    }
  }

  componentWillMount() {
    DataService.getEats().then(eats => {
      const sortedEats = eats.sort((a, b) => {
        if (a.name > b.name) {
          return 1
        } else {
          return -1
        }
      })
      this.setState({ eats: sortedEats })
    })
  }

  render() {
    return <Main eats={this.state.eats} />
  }
}
