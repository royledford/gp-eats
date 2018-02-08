import React from 'react'
import { compose, withProps, lifecycle } from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from 'react-google-maps'
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox' // eslint-disable-line
// import _ from 'lodash'

import mapStyle from '../../styles/mapStyle.json'
import config from '../../config/config'
import gpLogo from '../../img/map-gplogo.png'

// const google = window.google
const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || config.googleMapApiKey

const BaseMap = compose(
  withProps({
    googleMapURL: `${
      config.googleMapApi
    }key=${key}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className="main--map-container" />,
    mapElement: <div style={{ height: `100%` }} />,
  }),

  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentWillReceiveProps(nextProps) {
      const dirs = nextProps.routeDirections
      if (dirs) {
        const DirectionsService = new window.google.maps.DirectionsService()

        DirectionsService.route(
          {
            origin: new window.google.maps.LatLng(dirs.from.lat, dirs.from.lng),
            destination: new window.google.maps.LatLng(
              dirs.to.lat,
              dirs.to.lng
            ),
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              this.setState({
                directions: result,
              })
            } else {
              console.error(`error fetching directions ${result}`)
            }
          }
        )
      }
    },
  })
)(props => (
  <GoogleMap
    defaultZoom={props.zoomLevel}
    zoom={props.zoomLevel}
    center={props.center}
    defaultOptions={{ styles: mapStyle }}>
    {props.tooltip}
    <Marker
      position={props.homeMarkerPostion}
      defaultAnimation={2}
      icon={gpLogo}
    />
    {props.eatLocations.map(location => {
      return (
        <Marker
          key={location.id}
          position={{ lat: location.lat, lng: location.lng }}
          icon={props.eatMarker}
          onClick={() => props.markerClicked(location.id)}
        />
      )
    })}
    {props.directions && (
      <DirectionsRenderer
        directions={props.directions}
        options={{
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: 'rgba(145, 131, 61, 0.6)',
            strokeWeight: 8,
          },
        }}
      />
    )}
  </GoogleMap>
))

export default BaseMap
