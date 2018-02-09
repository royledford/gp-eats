import React from 'react'
import { compose, withProps, lifecycle } from 'recompose'
import { withScriptjs } from 'react-google-maps'
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox'
import config from '../../config/config'

const key =
  process.env.REACT_APP_GOOGLE_PLACES_API_KEY || config.googlePlacesApiKey

const Search = compose(
  withProps({
    googleMapURL: `${config.googleMapApi}key=${key}&v=3.exp&libraries=places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        onSearchBoxMounted: ref => {
          refs.searchBox = ref
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces()
          this.props.onAddressChanged(places)
        },
      })
    },
  }),
  withScriptjs
)(props => (
  <div data-standalone-searchbox="">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}>
      <input
        type="text"
        placeholder="Address or Name"
        className="eatsform--input"
        style={{
          textOverflow: `ellipses`,
        }}
      />
    </StandaloneSearchBox>
  </div>
))

export default Search
