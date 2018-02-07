import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMapContainer from './Maps/BaseMapContainer'
import Header from './Header'
import EatsList from './EatsList/EatsList'
import './Main.css'

export default class Main extends Component {
  static propTypes = {
    eats: PropTypes.array.isRequired,
    onCardClicked: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      someState: true,
    }
  }

  render() {
    const { eats, onCardClicked, mapTooltip } = this.props

    return (
      <div className="main--wrap-outer">
        <Header />
        <div className="main--content">
          <div className="main--map">
            <BaseMapContainer eats={eats} tooltip={mapTooltip} />
          </div>
          <div className="main--list">
            <EatsList eats={eats} cardClicked={onCardClicked} />
          </div>
        </div>
      </div>
    )
  }
}
