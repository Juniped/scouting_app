import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { Card, Typography, CardContent } from "@material-ui/core";
import "./static/App.css";
import MainNavbar from "./MainNavbar";
import Search from "./Search.js";
import TeamStats from "./TeamStats";
import Login from "./Login";
import BatterInfo from "./batter_info/BatterInfo";
import PitcherInfo from "./pitcher_info/PitcherInfo";
import { hasRole } from "./auth";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { API_URL } from "./config/Constants";
class Main extends Component {
  render() {
    return (
      <div className="main">{/* <h1> More Features Coming Soon</h1> */}</div>
    );
  }
}

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      username: "Non-User",
      userRoles: ["non-user"],
      logged_in: cookies.get("logged_in") || false
    };
    this.checkLogin = this.checkLogin.bind(this);
  }
  componentWillMount() {
    const { cookies } = this.props;
    if (cookies.get("logged_in")) {
      this.setState({ username: "Oriole_Player" });
      this.setState({ userRoles: ["user"] });
    }
  }
  checkLogin(username, password) {
    console.log("Login Form Submitted");
    // Check Login with Home DB

    let url = API_URL + "/api/login";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ username: username, password: password })
    })
      .then(res => res.json())
      .then(result => {
        if (result["correct"]) {
          const { cookies } = this.props;
          console.log("Successful Login Bitches");
          this.setState({ username: "Oriole_Player" });
          this.setState({ userRoles: ["user"] });
          cookies.set("logged_in", true, { pathj: "/" });
        } else {
          alert("Invalid Username/Password, please try again");
        }
      })
      .catch(() => {
        console.log("Request Swallowed!");
      });
  }
  render() {
    return (
      <div className="App">
        <Router>
          <div className="content">
            <MainNavbar user={this.state.userRoles} />
            <div className="container">
              {hasRole(this.state.userRoles, ["user"]) && (
                <>
                  <Route exact path="/" render={() => <Main />} />
                  <Route path="/info/pitchers" render={() => <PitcherInfo />} />
                  <Route path="/info/batters" render={() => <BatterInfo />} />
                </>
              )}
              {!hasRole(this.state.userRoles, ["user"]) && (
                <Login
                  checkLogin={this.checkLogin}
                  cookies={this.props.cookies}
                />
              )}
            </div>
          </div>
        </Router>
        <div style={{ margin: 10 }} align="left">
          <Card style={{ minWidth: 275, maxWidth: 275 }}>
            <CardContent>
              <Typography style={{ marginBotton: 12, fontSize: 18 }}>
                Useful Links
              </Typography>
              <a href="https://www.reddit.com/r/fakebaseball/">
                Fakebaseball Subreddit
              </a>
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

export default withCookies(App);
