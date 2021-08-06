import firebase from 'firebase';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAsKcBfYhE86rWu7a4WOm-4XTRCI3tHQDk",
    authDomain: "grammarenglish-93edd.firebaseapp.com",
    projectId: "grammarenglish-93edd",
    storageBucket: "grammarenglish-93edd.appspot.com",
    messagingSenderId: "930772192910",
    appId: "1:930772192910:web:b4fe8e5ffaa0b1570103df"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

export default {
    firebase,
    db,
    storage
}