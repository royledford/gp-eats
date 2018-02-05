import React from 'react'
import { compose, withProps, withStateHandlers } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import mapStyle from '../../styles/mapStyle.json'

import settings from '../../config/settings'
import config from '../../config/config'

const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || config.googleMapApiKey
const homeLat = settings.lat
const homeLng = settings.lng

const AdminMap = compose(
  withProps({
    googleMapURL: `${config.googleMapApi}key=${key}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `300px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    center: { lat: homeLat, lng: homeLng },
  }),
  withScriptjs(
    withGoogleMap(props => (
      <GoogleMap defaultZoom={props.zoomLevel} defaultCenter={props.center} defaultOptions={{ styles: mapStyle }}>
        <Marker defaultAnimation={2} position={props.markerPostion} icon={props.markerIcon} />
      </GoogleMap>
    ))
  )
)

export default AdminMap
