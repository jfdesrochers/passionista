import Rebase from 're-base'
import firebase from 'firebase'

const app = firebase.initializeApp({
    apiKey: "AIzaSyBvYwL_EtEBhLFzdA12SpQalV71Ba1OX3c",
    authDomain: "passionista-ca.firebaseapp.com",
    databaseURL: "https://passionista-ca.firebaseio.com",
    projectId: "passionista-ca",
    storageBucket: "passionista-ca.appspot.com",
    messagingSenderId: "237784587240"
})

const base = Rebase.createClass(app.database());

export default base;