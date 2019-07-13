import React, { Component } from 'react';
import {HashRouter as Router, Route} from "react-router-dom";
import './App.css';
import MainNavbar from './MainNavbar';
import PlayerSearch from './PlayerSearch';
import Info from './Info.js';
import TeamStats from './TeamStats';
import { makeStyles} from '@material-ui/core/styles';
import { Card, Typography, CardContent } from '@material-ui/core';




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
        <h1> More Features Coming Soon</h1>
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
              <Route path="info/pitchers" component={Info} />
              <Route path="team-stats" compont={TeamStats} />
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
    );}
}

export default App;
