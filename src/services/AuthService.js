import { auth, provider } from '../config/firebase'

export async function isLoggedIn() {
  return await auth.currentUser
}

export function login() {
  return auth.signInWithPopup(provider)
}

export function logout() {
  return auth.signOut()
}
