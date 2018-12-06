import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase/app';
import 'firebase/auth'; 
import 'firebase/database';

var config = {
    apiKey: "AIzaSyB8INuxC4yT2xMiTK-Ttpe8ODeN0pXprPk",
    authDomain: "chirper-aisrani.firebaseapp.com",
    databaseURL: "https://chirper-aisrani.firebaseio.com",
    projectId: "chirper-aisrani",
    storageBucket: "chirper-aisrani.appspot.com",
    messagingSenderId: "631973995734"
  };
  //firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));


