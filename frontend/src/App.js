import React, { Component } from 'react';
import {HashRouter as Router, Route} from "react-router-dom";
import './App.css';
import MainNavbar from './MainNavbar';
import Info from './Info.js';
import Avatar from '@material-ui/core/Avatar';
import { mergeClasses } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import panda from './panda.png';


const useStyles = makeStyles({
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
});

class PlayerSearch extends Component {
  
}


function Main() {
  const classes = useStyles();
  return (
    <div className="main">
      <h1> Draft me please </h1>
      <img alt="Juniped" src={panda} />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <div className="content">
          <MainNavbar />
          <div className="container">
            <Route exact path="/" component={Main} />
            <Route path="/info" component={Info} />
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
