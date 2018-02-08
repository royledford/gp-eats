import React, { Component } from 'react'
import DataService from '../services/DataService'
import Main from './Main'
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox'
import Settings from '../config/settings'

export default class MainContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eats: [],
      mapTooltip: null,
      mapCenter: null,
      selectedEat: '',
      selectedCardId: '',
      directions: null,
    }

    this.updateTooltip = this.updateTooltip.bind(this)
    this.handleMarkerClicked = this.handleMarkerClicked.bind(this)
    this.handleCardClicked = this.handleCardClicked.bind(this)
    this.handleHomeClicked = this.handleHomeClicked.bind(this)
    this.handleMarkerHover = this.handleMarkerHover.bind(this)
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
      this.setState({ eats: sortedEats, zoomLevel: Settings.zoomLevel })
    })
  }

  handleCardClicked(id) {
    this.updateTooltip(id)
    this.setDirections(id)
  }

  setDirections(id) {
    const eat = this.state.eats.filter(eat => eat.id === id)[0]
    this.setState({
      directions: {
        from: {
          lat: Settings.lat,
          lng: Settings.lng,
        },
        to: {
          lat: eat.lat,
          lng: eat.lng,
        },
      },
    })
  }

  updateTooltip(id) {
    const eat = this.state.eats.filter(eat => eat.id === id)[0]

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
    // this.setState({ mapTooltip, mapCenter: { lat: eat.lat, lng: eat.lng } })
    this.setState({ mapTooltip, selectedCardId: id })
  }

  handleMarkerClicked(id) {
    this.updateTooltip(id)
    this.setDirections(id)
    this.setState({ selectedCardId: id })
  }

  handleMarkerHover(id) {
    this.updateTooltip(id)
    this.setState({ selectedCardId: id })
  }

  handleHomeClicked() {
    this.setState({
      selectedCardId: '',
      selectedEat: '',
      directions: null,
      mapTooltip: null,
      mapCenter: { lat: Settings.lat, lng: Settings.lng },
      zoomLevel: Settings.zoomLevel,
    })
  }

  render() {
    const {
      eats,
      mapTooltip,
      mapCenter,
      selectedCardId,
      directions,
      zoomLevel,
    } = this.state
    return (
      <Main
        eats={eats}
        mapTooltip={mapTooltip}
        onCardClicked={this.handleCardClicked}
        mapCenter={mapCenter}
        markerClicked={this.handleMarkerClicked}
        selectedCardId={selectedCardId}
        directions={directions}
        homeMarkerClicked={this.handleHomeClicked}
        zoomLevel={zoomLevel}
        markerHover={this.handleMarkerHover}
      />
    )
  }
}
