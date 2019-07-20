import React, { Component } from 'react';
import {HashRouter as Router, Route} from "react-router-dom";
import { Card, Typography, CardContent } from '@material-ui/core';
import cookie from "react-cookies";
import './App.css';
import MainNavbar from './MainNavbar';
import Info from './Info.js';
import TeamStats from './TeamStats';
import Login from './Login';
import { hasRole } from './auth';

class Main extends Component{
  render(){
    return (
      <div className="main">
        <h1> More Features Coming Soon</h1>
      </div>
    );
  }
}

class App extends Component{
	constructor(props){
		super(props);
		this.state = {
      username:"Non-User",
      userRoles:["non-user"],
    }
    this.checkLogin = this.checkLogin.bind(this);
  }
  checkLogin(username, password){
    console.log("Login Form Submitted");
    // Check Login with Home DB

    let url = "http://localhost:5000/login";
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({username: username, password: password}),
    })
    .then((res) => res.json())
    .then((result) => {
      if (result['correct']){
        console.log("Successful Login Bitches");
        this.setState({username: "Oriole_Player"})
        this.setState({userRoles: ["user"] })

       
      } else {
        alert('Invalid Username/Password, please try again');
      }
    })
    .catch(() => {
        console.log('Request Swallowed!');
    });
  }
	render() {
    console.log(this.state.userRoles);
    return (
      <div className="App">
        <Router>
          <div className="content">
            <MainNavbar user={this.state.userRoles}/>
            <div className="container">
              {hasRole(this.state.userRoles, ['user']) &&<Route exact path="/" component={Main} /> }
              {hasRole(this.state.userRoles, ['user']) &&<Route path="/info" component={Info} /> }
              {hasRole(this.state.userRoles, ['user']) &&<Route path="/team-stats" compont={TeamStats} /> }
              {!hasRole(this.state.userRoles,['user']) &&<Login checkLogin={this.checkLogin} />}
            </div>
          </div>
        </Router>
        <div style={{margin:10}} align="left">
          <Card style={{ minWidth: 275, maxWidth: 275}}>
            <CardContent>
              <Typography style={{ marginBotton: 12, fontSize: 18}}>Useful Links</Typography>
              <a href="https://www.reddit.com/r/fakebaseball/"> Fakebaseball Subreddit</a>
              <br />
              <a href="https://redditball.xyz/">Fakebaseball Website</a>
              <br />
              <a href="https://discord.gg/PHCDwa3/"> Fakebaseball Discord</a>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default App;
