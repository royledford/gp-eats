import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox'
import mapStyle from '../../styles/mapStyle.json'

const BaseMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap defaultZoom={props.zoomLevel} defaultCenter={props.center} defaultOptions={{ styles: mapStyle }}>
      {props.isMarkerShown && <Marker defaultAnimation={2} position={props.markerPostion} icon={props.markerIcon} />}
      {props.eatLocations.map(location => {
        return <Marker key={location.id} position={{ lat: location.lat, lng: location.lng }} icon={props.eatMarker} />
      })}
    </GoogleMap>
  ))
)

export default BaseMap
