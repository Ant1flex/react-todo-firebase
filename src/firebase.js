import firebase from 'firebase'
import "firebase/auth"
// import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } from './secrets/config'
import firebaseConfig from './secrets/config'

firebase.initializeApp({
    apiKey: firebaseConfig.apiKey,
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId,
    storageBucket: firebaseConfig.storageBucket,
    messagingSenderId: firebaseConfig.messagingSenderId,
    appId: firebaseConfig.appId
});

const db = firebase.firestore()
const auth = firebase.auth()

export { db, auth }