import React, { Component } from 'react';
import {HashRouter as Router, Route} from "react-router-dom";
import './App.css';
import MainNavbar from './MainNavbar';
import PlayerSearchForm from './PlayerSearchForm';
import Info from './Info.js';
import { makeStyles} from '@material-ui/core/styles';




const useStyles = makeStyles(theme =>({
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));



class Main extends Component{
  render(){
    return (
      <div className="main">
        <PlayerSearchForm />
      </div>
    );
  }
}

class App extends Component{
  render() {
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
    );}
}

export default App;
