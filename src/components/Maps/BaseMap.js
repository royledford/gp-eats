import React from 'react'
import { compose, withProps } from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
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
    containerElement: <div style={{ height: `300px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),

  withScriptjs,
  withGoogleMap
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
  </GoogleMap>
))

export default BaseMap
