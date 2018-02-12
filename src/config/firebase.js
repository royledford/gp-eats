import firebase from 'firebase'
console.log(process.env.REACT_APP_FIRE_BASE_API)
console.log(process.env)

const config = {
  apiKey: process.env.REACT_APP_FIRE_BASE_API,
  authDomain: 'gp-eats-1517591141865.firebaseapp.com',
  databaseURL: 'https://gp-eats-1517591141865.firebaseio.com',
  projectId: 'gp-eats-1517591141865',
  storageBucket: 'gp-eats-1517591141865.appspot.com',
  messagingSenderId: '763228141139',
}

firebase.initializeApp(config)

export const provider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export default firebase
