import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import BaseMap from './BaseMap'
import BaseMap from './BaseMap'
import Geocode from '../../services/Geocode'
// import DataService from '../../services/DataService'
import settings from '../../config/settings'
import config from '../../config/config'
import gpLogo from '../../img/map-gplogo.png'
import eatMarker from '../../img/map-eat.png'

export default class BaseMapContainer extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    someProp: PropTypes.string,
  }
  static defaultProps = {
    someProp: 'someValue',
  }

  constructor(props) {
    super(props)
    this.state = {
      homeGeocode: {
        lat: 0,
        lng: 0,
      },
      eats: [],
    }
  }

  componentDidMount() {
    // Get all the places
    var address = settings.homeAddress
    Geocode.getGeocodeFromAddress(address)
      .then(location => {
        this.setState({
          homeGeocode: {
            lat: location.results[0].geometry.location.lat,
            lng: location.results[0].geometry.location.lng,
          },
        })
      })
      .catch(error => {
        console.log(error)
        this.setState({
          homeGeocode: {
            // just set something so we don't crash
            lat: 26,
            lng: -80,
          },
        })
      })
  }

  render() {
    const { homeGeocode } = this.state
    const { eats } = this.props
    const key =
      process.env.REACT_APP_GOOGLE_MAPS_API_KEY || config.googleMapApiKey

    return (
      <div>
        <BaseMap
          zoomLevel={settings.zoomLevel}
          markerPostion={{ lat: homeGeocode.lat, lng: homeGeocode.lng }}
          markerIcon={gpLogo}
          eatLocations={eats}
          eatMarker={eatMarker}
        />
      </div>
    )
  }
}
