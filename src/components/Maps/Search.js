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
        // places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces()
          // console.log(places)

          this.props.onAddressChanged(places)
          // this.setState({
          //   places,
          // })
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
    {/* <ol>
      {props.places.map(
        ({ place_id, formatted_address, geometry: { location } }) => (
          <li key={place_id}>
            {formatted_address}
            {' at '}
            ({location.lat()}, {location.lng()})
          </li>
        )
      )}
    </ol> */}
  </div>
))

export default Search
