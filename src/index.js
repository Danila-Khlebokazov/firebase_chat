import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";


// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyBNWM4Cq4NHYyqg9s-onc-3e3R13Qo1SPQ",
  authDomain: "fir-messenger-166b4.firebaseapp.com",
  projectId: "fir-messenger-166b4",
  storageBucket: "fir-messenger-166b4.appspot.com",
  messagingSenderId: "60166453631",
  appId: "1:60166453631:web:c867ce14527a2a9e30424a"
});

export const Context = createContext(null)

const auth = getAuth(app)
const db = getFirestore(app)

// const messaging = getMessaging(app);

// Notification.requestPermission().then((permission) => {
//   if (permission === 'granted') {
//       console.log('Notification permission granted.');
//       return getToken(messaging)
//   };
// }).then((token) => {
//   getMessaging().subscribeToTopic(token, "messages-firebase")
//   .then((response) => {
//     // See the MessagingTopicManagementResponse reference documentation
//     // for the contents of response.
//     console.log('Successfully subscribed to topic:', response);
//   })
//   .catch((error) => {
//     console.log('Error subscribing to topic:', error);
//   });
// })


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    auth, db
  }}>
    <App />
  </Context.Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
