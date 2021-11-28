import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBtYW_LtLPi0vehsue3btBIOWvosvh17g8",
  authDomain: "eventss-fe2a1.firebaseapp.com",
  databaseURL: "https://eventss-fe2a1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "eventss-fe2a1",
  storageBucket: "eventss-fe2a1.appspot.com",
  messagingSenderId: "953497299026",
  appId: "1:953497299026:web:053f12cca187a68d57178b"
}

firebase.initializeApp(firebaseConfig)
firebase.firestore()

export default firebase
