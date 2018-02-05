import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDK-3szJBUQsL7un4aSvWKmf4-yr8tCAxE',
  authDomain: 'gp-eats-1517591141865.firebaseapp.com',
  databaseURL: 'https://gp-eats-1517591141865.firebaseio.com',
  projectId: 'gp-eats-1517591141865',
  storageBucket: 'gp-eats-1517591141865.appspot.com',
  messagingSenderId: '763228141139',
}
firebase.initializeApp(config)
export default firebase
