import React from 'react'
import { compose, withProps, lifecycle } from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps'
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox'
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox'
import _ from 'lodash'

import mapStyle from '../../styles/mapStyle.json'
import settings from '../../config/settings'
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
    center: { lat: settings.lat, lng: settings.lng },
  }),

  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={props.zoomLevel}
    defaultCenter={props.center}
    defaultOptions={{ styles: mapStyle }}>
    {/* <InfoBox
      // position={{ lat: settings.lat, lng: settings.lng }}
      defaultPosition={
        new window.google.maps.LatLng(settings.lat, settings.lng)
      }
      options={{ closeBoxURL: ``, enableEventPropagation: true }}>
      <div
        style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
        <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
          Hello, Taipei!
        </div>
      </div>
    </InfoBox> */}
    {props.tooltip}
    <Marker
      position={{ lat: settings.lat, lng: settings.lng }}
      defaultAnimation={2}
      icon={gpLogo}
    />
    {props.eatLocations.map(location => {
      return (
        <Marker
          key={location.id}
          position={{ lat: location.lat, lng: location.lng }}
          icon={props.eatMarker}
        />
      )
    })}
  </GoogleMap>
))

export default BaseMap
