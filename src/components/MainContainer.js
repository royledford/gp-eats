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
      // const result = atob(eats.content)
      this.setState({ eats: eats })
    })
  }

  render() {
    return <Main eats={this.state.eats} />
  }
}
