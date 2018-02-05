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
      const result = atob(eats.content)
      const parsedResult = JSON.parse(result)
      const formattedEats = parsedResult.eats
      this.setState({ eats: formattedEats })
    })
  }

  render() {
    return <Main eats={this.state.eats} />
  }
}
