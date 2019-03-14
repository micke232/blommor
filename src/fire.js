import firebase from 'firebase/app';
import 'firebase/firestore';

const fire = (endpoint, type, data) => {
  const config = {
    apiKey: "AIzaSyAb-7yuQdKB6ZVpcT3V2FQVbPvnDbJTvgk",
    authDomain: "home-flower-app.firebaseapp.com",
    databaseURL: "https://home-flower-app.firebaseio.com",
    projectId: "home-flower-app",
    storageBucket: "home-flower-app.appspot.com",
    messagingSenderId: "235132733786"
  };
  if(!firebase.apps.length){
    firebase.initializeApp(config)
  }

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

  if (type === 'POST' && endpoint === 'rooms'){

    const putRoom = db.collection(endpoint);

    putRoom.add({
        name: data.name,
      });
      
  }
  if (type === 'POST' && endpoint === 'flowers'){

    const putFlowers = db.collection(endpoint);
    putFlowers.add({
        name: data.name,
        room: data.room,
        interval: data.interval,
        watered_latest: data.watered_latest,
      });
  }
  if (type === 'DELETE'){

    db.collection(endpoint).doc(data.id).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
      
  }
}

export default fire;