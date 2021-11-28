// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js'
import {
  getFirestore,
  collection,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDifieMiGVgcKoKP6XQLkYu8sf2D7Z7lyE',
  authDomain: 'watchful-muse-258714.firebaseapp.com',
  databaseURL: 'https://watchful-muse-258714-default-rtdb.firebaseio.com',
  projectId: 'watchful-muse-258714',
  storageBucket: 'watchful-muse-258714.appspot.com',
  messagingSenderId: '67083904862',
  appId: '1:67083904862:web:c75e9434da6c9c806ed1cf',
  measurementId: 'G-CM42680GCJ',
}

// Initialize Firebase
initializeApp(firebaseConfig)
const db = getFirestore()
export const colRef = collection(db, 'dishes')
