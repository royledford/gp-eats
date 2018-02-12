import firebase from '../config/firebase'

const Keys = {
  getKey: async function(keyName) {
    // if the key is the main firebase key, just return it
    // This key (all of them really) should be an ENV variable
    // **BUT** I'm hosting this on gh-pages and there are no
    // ENV variable. If this gets moved to a real site, this
    // will need to be updated.
    // debugger
    // if (keyName === 'FIREBASE_API_KEY') {
    //   return 'AIzaSyDK-3szJBUQsL7un4aSvWKmf4-yr8tCAxE'
    // }

    const keySnapshot = await firebase
      .database()
      .ref(`keys/${keyName}`)
      .once('value')
    return keySnapshot.val()
  },
}

export default Keys
