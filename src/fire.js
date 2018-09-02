import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyAb-7yuQdKB6ZVpcT3V2FQVbPvnDbJTvgk",
    authDomain: "home-flower-app.firebaseapp.com",
    databaseURL: "https://home-flower-app.firebaseio.com",
    projectId: "home-flower-app",
    storageBucket: "home-flower-app.appspot.com",
    messagingSenderId: "235132733786"
  };
  const fire = firebase.initializeApp(config)
export default fire;