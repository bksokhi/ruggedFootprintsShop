import firebase from 'firebase/app';
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAwCMbdEPHrXJ1ozNo_J9sdpV6HYtzcqNw",
    authDomain: "rugged-footprints-shop.firebaseapp.com",
    databaseURL: "https://rugged-footprints-shop.firebaseio.com",
    projectId: "rugged-footprints-shop",
    storageBucket: "rugged-footprints-shop.appspot.com",
    messagingSenderId: "562935868864",
    appId: "1:562935868864:web:cf408414063475977aec25"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;