import firebase from "firebase";
import firestore from "firebase/firestore";

// Your web app's Firebase configuration
var config = {
  apiKey: "AIzaSyD5wYwYV_mWuD4vo5LJgoGCCfwHzUATZy4",
  authDomain: "my-recipes-vue.firebaseapp.com",
  databaseURL: "https://my-recipes-vue.firebaseio.com",
  projectId: "my-recipes-vue",
  storageBucket: "my-recipes-vue.appspot.com",
  messagingSenderId: "267553732612",
  appId: "1:267553732612:web:dd9ba0a0a6f930dae31d51"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(config);

//export firestore database
export default firebaseApp.firestore();
