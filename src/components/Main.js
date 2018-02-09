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
    markerClicked: PropTypes.func.isRequired,
    homeMarkerClicked: PropTypes.func.isRequired,
    mapCenter: PropTypes.object,
    selectedCardId: PropTypes.string,
    directions: PropTypes.object,
    zoomLevel: PropTypes.number,
    markerHover: PropTypes.func.isRequired,
  }
  static defaultProps = {
    selectedCardId: '',
    // zoomLevel: 14,
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
      homeMarkerClicked,
      zoomLevel,
      markerHover,
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
              selectedCardId={selectedCardId}
              homeMarkerClicked={homeMarkerClicked}
              zoomLevel={zoomLevel}
              markerHover={markerHover}
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
