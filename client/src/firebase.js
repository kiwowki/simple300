import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDW0sn3RFSaN9-tuz9Chmk1LshSvyqRFGA",
    authDomain: "simple-200.firebaseapp.com",
    projectId: "simple-200",
    storageBucket: "simple-200.appspot.com",
    messagingSenderId: "523296652813",
    appId: "1:523296652813:web:3e56009eed33fabde35f44"
};


firebase.initializeApp(firebaseConfig)

export default firebase;