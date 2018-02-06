import axios from 'axios'

const DataService = {
  // saveInvest: function(invest) {
  //   axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('authToken')
  //   return axios.post(process.env.REACT_APP_BASE_URL + '/invests/', invest)
  // },

  getEats: function() {
    return axios
      .get('https://api.github.com/repos/royledford/gp-eats/contents/data.json')
      .then(function(response) {
        return response.data
      })
      .catch(function(error) {
        console.log(error)
      })
  },

  // getInvest: function(id) {
  //   return axios
  //     .get(process.env.REACT_APP_BASE_URL + '/invests/' + id)
  //     .then(function(response) {
  //       return response.data
  //     })
  //     .catch(function(error) {
  //       console.log(error)
  //     })
  // },
}

export default DataService
