import firebase from 'firebase'
import firebaseui from 'firebaseui'

const firebaseSettings = {
  apiKey: 'AIzaSyCNbhVUN-YB_NQezCfMjk3eWLElmg08M_w',
  authDomain: 'wiffleball-authentication.firebaseapp.com',
  databaseURL: 'https://wiffleball-authentication.firebaseio.com',
  projectId: 'wiffleball-authentication',
  storageBucket: 'wiffleball-authentication.appspot.com',
  messagingSenderId: '48206410793'
}

export const firebaseAuth = firebase.initializeApp(firebaseSettings)
export const firebaseUi = new firebaseui.auth.AuthUI(firebase.auth(firebaseAuth))
