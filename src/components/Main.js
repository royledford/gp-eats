import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMapContainer from './Maps/BaseMapContainer'
import Header from './Header'
import Table from './Table'
import './Main.css'

export default class Main extends Component {
  static propTypes = {
    eats: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      someState: true,
    }
  }

  render() {
    const { eats } = this.props

    return (
      <div className="main--wrap">
        <Header />
        <div className="main--content">
          <BaseMapContainer />
          <Table eats={eats} />
        </div>
      </div>
    )
  }
}
