import React from 'react'
import { compose, withProps, lifecycle } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox'
import _ from 'lodash'

import mapStyle from '../../styles/mapStyle.json'
import settings from '../../config/settings'
import config from '../../config/config'
import gpLogo from '../../img/map-gplogo.png'

const google = window.google
const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || config.googleMapApiKey

const AdminMap = compose(
  withProps({
    googleMapURL: `${config.googleMapApi}key=${key}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `300px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    center: { lat: settings.lat, lng: settings.lng },
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        bounds: null,
        center: {
          lat: 41.9,
          lng: -87.624,
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces()
          const bounds = new google.maps.LatLngBounds()
          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          })
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }))
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center)

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          })
          // refs.map.fitBounds(bounds);
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={settings.zoomLevel} defaultCenter={props.center} defaultOptions={{ styles: mapStyle }}>
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      // controlPosition={google.maps.ControlPosition.TOP_LEFT}
      controlPosition={1}
      onPlacesChanged={props.onPlacesChanged}>
      <input
        type="text"
        placeholder="Customized your placeholder"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `27px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </SearchBox>
    <Marker position={{ lat: settings.lat, lng: settings.lng }} defaultAnimation={2} icon={gpLogo} />
    {props.markers.map((marker, index) => <Marker key={index} position={marker.position} />)}
  </GoogleMap>
))

export default AdminMap
