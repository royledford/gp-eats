import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox'
import mapStyle from '../../styles/mapStyle.json'

// process.env.REACT_APP_STRIPE_KEY

const BaseMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap defaultZoom={props.zoomLevel} defaultCenter={props.center} defaultOptions={{ styles: mapStyle }}>
      {props.isMarkerShown && <Marker defaultAnimation={2} position={props.markerPostion} icon={props.markerIcon} />}
      {props.eatLocations.map(location => {
        console.log(location)
        return <Marker position={{ lat: location.lat, lng: location.lng }} icon={props.eatMarker} />
      })}
    </GoogleMap>
  ))
)

export default BaseMap
