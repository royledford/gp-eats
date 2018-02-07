import React, { Component } from 'react'
import DataService from '../services/DataService'
import Main from './Main'
const { InfoBox } = require('react-google-maps/lib/components/addons/InfoBox')
const google = window.google

export default class MainContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eats: [],
      mapTooltip: null,
    }
    this.updateTooltip = this.updateTooltip.bind(this)
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
    console.log('eat lat', eat.lat, eat.lng)
    const mapTooltip = (
      <InfoBox
        position={new window.google.maps.LatLng(eat.lat, eat.lng)}
        options={{ closeBoxURL: ``, enableEventPropagation: true }}>
        <div
          style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
          <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
            Hello, Taipei!
          </div>
        </div>
      </InfoBox>
    )
    this.setState({ mapTooltip })
  }

  render() {
    return (
      <Main
        eats={this.state.eats}
        mapTooltip={this.state.mapTooltip}
        onCardClicked={this.updateTooltip}
      />
    )
  }
}
