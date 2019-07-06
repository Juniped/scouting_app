import React, { Component } from 'react';
import {HashRouter as Router, Route} from "react-router-dom";
import './App.css';
import MainNavbar from './MainNavbar';


class Main extends Component{
  render() {
    return (
      <div className="main">
        <h1> OwO </h1>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Router>
        <div className="content">
          <MainNavbar />
          <div classNme="container">
            <Route exact path="/" component={Main} />
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
