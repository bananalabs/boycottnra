import guid from './browserfingerprint.js';
const firebase = require('firebase');

// Initialize Firebase
const config = {
    apiKey: "AIzaSyCnn8lXSp5oC4dqsFfWKoVuxQyQxvuSvDM",
    authDomain: "boycottnra.firebaseapp.com",
    databaseURL: "https://boycottnra.firebaseio.com",
    projectId: "boycottnra",
    storageBucket: "",
    messagingSenderId: "206521813413"
};

console.log(config);

firebase.initializeApp(config);

export function writeToDB(key, value) {
    console.log('writeToDB');
    console.log(key);
    console.log(value);
    firebase.database().ref(key).set(value)
    .then((result) => console.log(result))
    .catch((err) => console.log(err))
}

export function readFromDB(key) {
    console.log('key');
    console.log(key);
    return firebase.database().ref(key).once('value');
}