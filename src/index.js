import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './index.css';
import './style.css';
import App from './App';
import firebase from 'firebase/app';
import 'firebase/auth'; 
import 'firebase/database';
import { BrowserRouter as Router, Route, Link, Switch, HashRouter} from 'react-router-dom'


var config = {
    apiKey: "AIzaSyCMzMlN46xKhXyyHLIbF5gMQiJ5zGopkkM",
    authDomain: "stage4-info340.firebaseapp.com",
    databaseURL: "https://stage4-info340.firebaseio.com",
    projectId: "stage4-info340",
    storageBucket: "stage4-info340.appspot.com",
    messagingSenderId: "692235007256"
  };
  firebase.initializeApp(config);
ReactDOM.render(<HashRouter basename="/react-project-spotifydata">(<App/>)</HashRouter>, document.getElementById('root'));


