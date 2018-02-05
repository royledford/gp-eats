import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMapContainer from './Maps/BaseMapContainer'
import Header from './Header'
// import EatsListContainer from './EatsList/EatsListContainer'
import EatsList from './EatsList/EatsList'
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
      <div className="main--wrap-outer">
        <Header />
        <div className="main--content">
          <div className="main--map">
            <BaseMapContainer eats={eats} />
          </div>
          <div className="main--list">
            <EatsList eats={eats} />
          </div>
        </div>
      </div>
    )
  }
}
