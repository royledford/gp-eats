import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BaseMap from './BaseMap'
import Geocode from '../../services/Geocode'
import settings from '../../config/settings'
import gpLogo from '../../img/map-gplogo.png'
import eatMarker from '../../img/map-eat.png'

export default class BaseMapContainer extends Component {
  static propTypes = {
    eats: PropTypes.array.isRequired,
    tooltip: PropTypes.any,
    mapCenter: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
    markerClicked: PropTypes.func,
    // if driections are provided, a route will be rendered.
    directions: PropTypes.shape({
      from: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
      }),
      to: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
      }),
    }),
    selectedCardId: PropTypes.string,
    homeMarkerClicked: PropTypes.func.isRequired,
    zoomLevel: PropTypes.number,
    markerHover: PropTypes.func.isRequired,
    // mapHeight: PropTypes.number,
  }
  static defaultProps = {
    markerClicked: () => {},
    directions: null,
    selectedMarkerId: '',
    zoomLevel: 14,
    // mapHeight: 300,
  }

  constructor(props) {
    super(props)
    this.state = {
      homeGeocode: {
        lat: 0,
        lng: 0,
      },
    }
  }

  componentDidMount() {
    // Get the home location from settings.
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
    const {
      eats,
      tooltip,
      mapCenter,
      markerClicked,
      directions,
      selectedCardId,
      homeMarkerClicked,
      zoomLevel,
      markerHover,
    } = this.props
    const center = mapCenter ? mapCenter : homeGeocode
    // const zoomLevel = mapCenter ? 16 : settings.zoomLevel
    return (
      <div>
        <BaseMap
          zoomLevel={zoomLevel}
          center={center}
          homeMarkerPostion={{ lat: homeGeocode.lat, lng: homeGeocode.lng }}
          markerIcon={gpLogo}
          eatLocations={eats}
          eatMarker={eatMarker}
          tooltip={tooltip}
          markerClicked={markerClicked}
          routeDirections={directions}
          selectedMarkerId={selectedCardId}
          homeMarkerClicked={homeMarkerClicked}
          markerHover={markerHover}
          // mapHeight={mapHeight}
        />
      </div>
    )
  }
}
