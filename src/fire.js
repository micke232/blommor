const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const fire = (endpoint, type, data) => {
  const config = {
    apiKey: "AIzaSyAb-7yuQdKB6ZVpcT3V2FQVbPvnDbJTvgk",
    authDomain: "home-flower-app.firebaseapp.com",
    databaseURL: "https://home-flower-app.firebaseio.com",
    projectId: "home-flower-app",
    storageBucket: "home-flower-app.appspot.com",
    messagingSenderId: "235132733786"
  };
  firebase.initializeApp(config)
  const db = firebase.firestore();

  if (type === 'GET'){
    const flowers = db.collection(endpoint).get().then((querySnapshot) => {
      const data = []
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        })
      });
      return data;
    });
    return flowers;
  }
  if (type === 'POST'){
    console.log(data.id)
  }
}

export default fire;