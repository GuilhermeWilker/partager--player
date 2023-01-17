import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCC8MKY6kwYQcMuRNbYWFL3p-vgOaXklHw",
  authDomain: "music-app-668d3.firebaseapp.com",
  projectId: "music-app-668d3",
  storageBucket: "music-app-668d3.appspot.com",
  appId: "1:573835385549:web:78250bb2c483bc36a8e784",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

db.enablePersistence().catch((err) => {
  console.log(`Firebase persistence error ${err.code}`);
});

// coleçoes
const usersCollection = db.collection("users");
const songsCollection = db.collection("songs");
const commentsCollection = db.collection("comments");

export {
  auth,
  db,
  usersCollection,
  storage,
  songsCollection,
  commentsCollection,
};
