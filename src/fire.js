const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const fire = (endpoint) => {
  const config = {
    apiKey: "AIzaSyAb-7yuQdKB6ZVpcT3V2FQVbPvnDbJTvgk",
    authDomain: "home-flower-app.firebaseapp.com",
    databaseURL: "https://home-flower-app.firebaseio.com",
    projectId: "home-flower-app",
    storageBucket: "home-flower-app.appspot.com",
    messagingSenderId: "235132733786"
  };
  const fire = firebase.initializeApp(config)
  const db = firebase.firestore();
  const flowers = db.collection(endpoint).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
  });
  return flowers;
}

export default fire;