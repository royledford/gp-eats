import React, { Component } from 'react'
import DataService from '../services/DataService'
import Main from './Main'
const { InfoBox } = require('react-google-maps/lib/components/addons/InfoBox')

export default class MainContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eats: [],
      mapTooltip: null,
      selectedEat: '',
      selectedCardId: '',
    }
    this.updateTooltip = this.updateTooltip.bind(this)
    this.handleMarkerClicked = this.handleMarkerClicked.bind(this)
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

  updateTooltip(id) {
    const eats = this.state.eats
    const eat = eats.filter(eat => eat.id === id)[0]

    const mapTooltip = (
      <InfoBox
        position={new window.google.maps.LatLng(eat.lat, eat.lng)}
        options={{ closeBoxURL: ``, enableEventPropagation: true }}>
        <div
          style={{
            backgroundColor: 'rgb(145, 131, 61)',
            padding: `4px`,
            borderRadius: '3px',
          }}>
          <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
            {eat.name}
          </div>
        </div>
      </InfoBox>
    )
    this.setState({ mapTooltip, mapCenter: { lat: eat.lat, lng: eat.lng } })
  }

  handleMarkerClicked(id) {
    this.setState({ selectedCardId: id })
  }

  render() {
    const { eats, mapTooltip, mapCenter, selectedCardId } = this.state
    return (
      <Main
        eats={eats}
        mapTooltip={mapTooltip}
        onCardClicked={this.updateTooltip}
        mapCenter={mapCenter}
        markerClicked={this.handleMarkerClicked}
        selectedCardId={selectedCardId}
      />
    )
  }
}
