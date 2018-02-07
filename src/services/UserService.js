import firebase, { auth, provider } from '../config/firebase'

export async function isUserAdmin(id) {
  const eatsRef = firebase.database().ref('role/admin')
  eatsRef.once('value', snapshot => {
    let roles = snapshot.val()
    debugger
    // if (eats) {
    //   eats.id = id
    //   resolve(eats)
    // } else {
    //   reject("Can't find any places")
    // }
  })
}
