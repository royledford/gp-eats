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
              servesBeer: eats[eat].servesBeer,
            })
          }
          resolve(newState)
        } else {
          reject("Can't find any places")
        }
      })
    })
  },

  getEat: function(id) {
    return new Promise((resolve, reject) => {
      const eatsRef = firebase.database().ref('eats/' + id)
      eatsRef.once('value', snapshot => {
        let eats = snapshot.val()
        if (eats) {
          eats.id = id
          resolve(eats)
        } else {
          reject("Can't find any places")
        }
      })
    })
  },

  updateEat: function(id, eat) {
    return new Promise((resolve, reject) => {
      const eatsRef = firebase.database().ref('eats/' + id)
      eatsRef.set(eat)
      resolve()
    })
  },

  deleteEat: async function(id) {
    return new Promise((resolve, reject) => {
      const eatsRef = firebase.database().ref('eats')
      eatsRef.child(id).remove()
      resolve()
    })
  },
}

export default DataService
