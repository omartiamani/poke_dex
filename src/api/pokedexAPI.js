import firebase from "firebase";

// Required for side-effects
require("firebase/firestore");

// Initialize Firebase
var firebaseConfig = {
  //Bad practice: we should use an environment variable
  apiKey: process.env.REACT_APP_METEORITE_STRIKE_DATASET.FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_METEORITE_STRIKE_DATASET.AUTH_DOMAIN,
  projectId: process.env.REACT_APP_METEORITE_STRIKE_DATASET.PROJECT_ID
};
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
var pokemons = db.collection("pokemon");

/**
 *
 * @param {Object} pokemon The pokemon to save.
 * Save a pokemon to the database
 */
export const savePokemon = pokemon => {
  // Initialize Cloud Firestore through Firebase

  return pokemons.add(pokemon);
};

/**
 *
 * @param {string} id The id of the pokemon
 * Remove a pokemon from the database
 */
export const removePokemon = id => {
  return new Promise((resolve, reject) => {
    pokemons
      .where("id", "==", id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(function(doc) {
          doc.ref.delete();
          resolve();
        });
      })
      .catch(err => {
        reject(err);
      });
  });
};

/**
 * Load all the pokemons from the database
 */
export const loadPokemons = () => {
  return new Promise((resolve, reject) => {
    pokemons
      .get()
      .then(querySnapshot => {
        const result = [];
        querySnapshot.forEach(function(doc) {
          result.push(doc.data());
        });
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
  });
};
