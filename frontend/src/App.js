import React, { Component } from 'react';
import {HashRouter as Router, Route} from "react-router-dom";
import { Card, Typography, CardContent } from '@material-ui/core';
import './App.css';
import MainNavbar from './MainNavbar';
import Info from './Info.js';
import TeamStats from './TeamStats';
import Login from './Login';

import { hasRole } from './auth';

// const user  ={
//   name: 'Juniped',
//   roles:['admin'],
//   right:['can_view_all']
// };

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
			user:{
        name:"Non-User",
        roles:["non-user"],
      },
    }
    this.checkLogin = this.checkLogin.bind(this);
  }
  checkLogin(username, password){
    console.log("Login Form Submitted");
    console.log(username);
    console.log(password);
    // Check Login with Home DB
    let username = encodeURIComponent(username.trim());
    let url = "http://localhost:5000/login/";
    fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
    })
        .then((res) => res.json())
        .then((result) => {
          if (result['correct'] === false){
            console.profile("Invalid Username/Password")
          }
            // const pitch_data = this.state.pitch_data.slice();
            // let new_pitches = [];
            // for (let i = 0; i < result.length; i++) {
            //     let res = result[i];
            //     new_pitches.push(res);
            // }
            // console.log(new_pitches)
            // this.setState({
            //     pitch_data: pitch_data.concat(new_pitches),
            //     loading: false,
            // });
        })
        .catch(() => {
            console.log('Request Swallowed!');
        });
}
    return
  }
	render() {
    return (
      <div className="App">
        <Router>
          <div className="content">
            <MainNavbar user={this.state.user}/>
            <div className="container">
              {hasRole(this.state.user, ['user']) &&<Route exact path="/" component={Main} /> }
              {hasRole(this.state.user, ['user']) &&<Route path="/info" component={Info} /> }
              {hasRole(this.state.user, ['user']) &&<Route path="/team-stats" compont={TeamStats} /> }
              {!hasRole(this.state.user,['user']) &&<Login checkLogin={this.checkLogin} />}
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
