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
    mapCenter: PropTypes.object,
    markerClicked: PropTypes.func.isRequired,
    selectedCardId: PropTypes.string,
    directions: PropTypes.object,
  }
  static defaultProps = {
    selectedCardId: '',
  }

  render() {
    const {
      eats,
      onCardClicked,
      mapTooltip,
      mapCenter,
      markerClicked,
      selectedCardId,
      directions,
    } = this.props

    return (
      <div className="main--wrap-outer">
        <Header />
        <div className="main--content">
          <div className="main--map">
            <BaseMapContainer
              eats={eats}
              tooltip={mapTooltip}
              mapCenter={mapCenter}
              markerClicked={markerClicked}
              directions={directions}
            />
          </div>
          <div className="main--list">
            <EatsList
              eats={eats}
              cardClicked={onCardClicked}
              selectedCardId={selectedCardId}
            />
          </div>
        </div>
      </div>
    )
  }
}
