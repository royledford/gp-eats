import axios from 'axios'
import firebase from '../config/firebase'

const DataService = {
  saveEats: function(eat) {
    return new Promise((resolve, reject) => {
      const eatsRef = firebase.database().ref('eats')
      let newRef = eatsRef.push(eat)
      if (newRef) {
        resolve(newRef.key)
      } else {
        reject('Eat could not be saved.')
      }
    })
  },

  getEats: function() {
    return new Promise((resolve, reject) => {
      const eatsRef = firebase.database().ref('eats')
      eatsRef.on('value', snapshot => {
        let eats = snapshot.val()
        if (eats) {
          console.log(eats)
          let newState = []
          for (let eat in eats) {
            newState.push({
              id: eat,
              name: eats[eat].name,
              address: eats[eat].address,
              category: eats[eat].category,
              lat: eats[eat].lat,
              lng: eats[eat].lng,
              phone: eats[eat].phone,
              website: eats[eat].website,
            })
          }
          resolve(newState)
        } else {
          reject("Can't find any places")
        }
      })
    })

    // return axios
    //   .get('https://api.github.com/repos/royledford/gp-eats/contents/data.json')
    //   .then(function(response) {
    //     return response.data
    //   })
    //   .catch(function(error) {
    //     console.log(error)
    //   })
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
