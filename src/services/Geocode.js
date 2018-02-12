import axios from 'axios'
import config from '../config/config'

const Geocode = {
  getGeocodeFromAddress: function(address) {
    var encodedAddress = encodeURIComponent(address)
    return axios
      .get(
        `${config.geocodeApi}address=${encodedAddress}&key=${
          config.geocodeApiKey
        }`
      )
      .then(function(response) {
        return response.data
        // if ((response.data.status = 'OK')) {
        //   // console.log('Home address could not be found', response.data)
        //   return {
        //     status: 200,
        //     address: response.data.body.results[0].formatted_address,
        //     lat: response.data.body.results[0].geometry.location.lat,
        //     lng: response.data.body.results[0].geometry.location.lng,
        //   }
        // } else {
        //   return {
        //     status: 404,
        //     error: 'Home address could not be found',
        //     response: response.data,
        //   }
        // }
      })
      .catch(function(error) {
        return {
          status: 500,
          error: 'Could not contact google servers.',
          response: error,
        }
      })
  },
}

export default Geocode
