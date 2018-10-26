import firebase from "firebase";

var config = {
  apiKey: "AIzaSyD-AzPH84EcM1kVpPPp6r9XD8WuVsIIb30",
  authDomain: "hide-and-seek-a5ea8.firebaseapp.com",
  databaseURL: "https://hide-and-seek-a5ea8.firebaseio.com",
  projectId: "hide-and-seek-a5ea8",
  storageBucket: "hide-and-seek-a5ea8.appspot.com",
  messagingSenderId: "669082756081"
};

firebase.initializeApp(config);

const database = firebase.database();

export default database;
