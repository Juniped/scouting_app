import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import {
  Typography,
  Grid,
  Paper,
  Container,
  Box,
  Button,
} from "@material-ui/core";
import PlayerSelect from "../data_components/PlayerSelect";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  Area,
  AreaChart,
} from "recharts";
import MediaQuery from "react-responsive";
import { API_URL } from "../config/Constants";
import LastSix from "../data_components/LastSix";
import PitchMatrix from "../data_components/PitchMatrix";
import ChangeMatrix from "../data_components/ChangeMatrix";
import RawData from "../data_components/RawData";
import FirstInning from "../data_components/FirstInning";
import Jumps from "../data_components/Jumps";
import LastFirst from "../data_components/LastFirst";
import DoubleDown from "../data_components/DoubleDown";
import DoubleDownResults from "../data_components/DoubleDownResults";
import CurrentGame from '../data_components/CurrentGame';
import FollowingMatrix from '../data_components/FollowingMatrix';
import Bounceback from '../data_components/Bounceback';



const colors = ["#DF4400", "#000000"];

const useStyles = theme => ({
  root: {
    flexGrow: 1
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  title: {
    fontSize: 14
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  table: {
    padding: theme.spacing(1)
  }
});
class CustomLabel extends Component{
  render() {
    const {x,y,stroke,value,payload} = this.props;
    return <text x={x} y={y} dy={-4} fill={stroke} fontSize={12} textAnchor="middle">{value}</text>
  }
}

class CustomLabel2 extends Component {
  render() {
    const { x, y, stroke, value} = this.props;
    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={12} textAnchor="middle">
        {this.props.data[this.props.index].result}
      </text>
    );
  }
}

class PitcherInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTeam: "",
      team: "",
      players: [],
      eVm: [],
      rawData: [],
      fav: "",
      lastSix: [],
      matrix: [],
      firstInning: [],
      jumps:[],
      lastFirst:[],
      counts: [],
      changeMatrix:[],
      milrData: [],
      double_down:[],
      double_down_results:[],
      current_game: [],
      last20: [],
      following:[],
      bounceback:[],
      player: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.getPlayerData = this.getPlayerData.bind(this);
    this.refreshPlayerData = this.refreshPlayerData.bind(this);
  }
  getTeam() {
    if (this.state.currentTeam === "") {
      this.setState({
        team: "",
        players: [],
        eVm: [],
        rawData: [],
        fav: "",
        lastSix: [],
        matrix: [],
        firstInning: [],
        counts: [],
        changeMatrix: [],
        milrData: [],
        double_down: [],
        double_down_results: [],
        current_game: [],
        last20: [],
        following: [],
        bounceback: [],
        player: "",
      });
      return;
    }
    let teamName = encodeURIComponent(this.state.currentTeam.trim());
    let url = API_URL + "/get/team/name/" + teamName;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(result => {
        this.setState({ team: result[0] }, this.getPlayers);
      })
      .then(() => {
        this.getPlayers();
      })
      .catch(error => {
        console.log(error);
        console.log("Request Swallowed!");
      });
  }
  getPlayers() {
    let teamID = this.state.team.tag;
    let player_url = API_URL + "/get/pitchers/team/" + teamID;
    fetch(player_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(result => {
        this.setState({ players: result });
      })
      .catch(error => {
        console.log(error);
        console.log("Request Swallowed!");
      });
  }
  handleChange(event) {
    event.preventDefault();
    this.setState(
      { currentTeam: event.target.value, players: [] },
      this.getTeam
    );
  }
  renderLabel = function(entry) {
    let label = entry.name + "(" + entry.value + ")";
    return label;
  };
  getPlayerData(playerID) {
    let url = API_URL + "/info/pitcher/" + playerID;
    this.setState({player:playerID})
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(result => {
        this.setState({
          rawData: result.data,
          playerFav: result.fav,
          eVm: result.eVm,
          fav: result.fav,
          lastSix: result.last_6,
          matrix: result.matrix,
          firstInning: result.first_inning,
          jumps: result.jumps,
          lastFirst: result.last_first,
          changeMatrix: result.change_matrix,
          milrData: result.milrData,
          double_down:result.double_down,
          double_down_results: result.double_down_results,
          current_game:result.current_game,
          last20: result.last20,
          following: result.following,
          bounceback: result.bounceback,
        });
      })
      .catch(error => {
        console.log(error);
        console.log("Request Swallowed!");
      });
    // Get Counts Seperate
    let counturl = API_URL + "/info/pitcher/counts/" + playerID;
    fetch(counturl, {
       method: "GET",
       headers: {
         "Content-Type": "application/json"
       }
     })
       .then(res => res.json())
       .then(result => {
         this.setState({
           counts: result.counts
         });
       })
       .catch((error) => {
         console.log(error)
         console.log("Request Swallowed!");
       });
    
  }

  refreshPlayerData(){
    var playerID =this.state.player;
    let url = API_URL + "/info/pitcher/" + playerID;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(result => {
        this.setState({
          rawData: result.data,
          playerFav: result.fav,
          eVm: result.eVm,
          fav: result.fav,
          lastSix: result.last_6,
          matrix: result.matrix,
          firstInning: result.first_inning,
          jumps: result.jumps,
          lastFirst: result.last_first,
          changeMatrix: result.change_matrix,
          milrData: result.milrData,
          double_down:result.double_down,
          double_down_results: result.double_down_results,
          current_game:result.current_game,
          last20: result.last20,
          following: result.following,
          bounceback: result.bounceback,
        });
      })
      .catch(error => {
        console.log(error);
        console.log("Request Swallowed!");
      });
    // Get Counts Seperate
    let counturl = API_URL + "/info/pitcher/counts/" + playerID;
     fetch(counturl, {
       method: "GET",
       headers: {
         "Content-Type": "application/json"
       }
     })
       .then(res => res.json())
       .then(result => {
         this.setState({
           counts: result.counts
         });
       })
       .catch((error) => {
         console.log(error)
         console.log("Request Swallowed!");
       });
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <Typography
                className={classes.Title}
                color="textSecondary"
                gutterBottom
              >
                Select a Team
              </Typography>
              <FormControl className={classes.formControl}>
                <NativeSelect
                  value={this.state.currentTeam}
                  onChange={this.handleChange}
                  inputProps={{
                    name: "currentTeam",
                    id: "team-native-simple",
                  }}
                >
                  <option value="" />
                  <option value="Arizona Diamondbacks">
                    Arizona Diamondbacks
                  </option>
                  <option value="Atlanta Braves">Atlanta Braves</option>
                  <option value="Baltimore Orioles">Baltimore Orioles</option>
                  <option value="Boston Red Sox">Boston Red Sox</option>
                  <option value="Chicago Cubs">Chicago Cubs</option>
                  <option value="Chicago White Sox">Chicago White Sox</option>
                  <option value="Cincinnati Reds">Cincinnati Reds</option>
                  <option value="Cleveland Indians">Cleveland Indians</option>
                  <option value="Colorado Rockies">Colorado Rockies</option>
                  <option value="Detroit Tigers">Detroit Tigers</option>
                  <option value="Houston Colt 45's">Houston Colt 45's</option>
                  <option value="Kansas City Royals">Kansas City Royals</option>
                  <option value="Los Angeles Angels">Los Angeles Angels</option>
                  <option value="Los Angeles Dodgers">
                    Los Angeles Dodgers
                  </option>
                  <option value="Miami Marlins">Miami Marlins</option>
                  <option value="Milwaukee Brewers">Milwaukee Brewers</option>
                  <option value="Minnesota Twins">Minnesota Twins</option>
                  <option value="Montreal Expos">Montreal Expos</option>
                  <option value="New York Mets">New York Mets</option>
                  <option value="New York Yankees">New York Yankees</option>
                  <option value="Oakland Athletics">Oakland Athletics</option>
                  <option value="Philadelphia Phillies">
                    Philadelphia Phillies
                  </option>
                  <option value="Pittsburgh Pirates">Pittsburgh Pirates</option>
                  <option value="San Diego Padres">San Diego Padres</option>
                  <option value="San Francisco Giants">
                    San Francisco Giants
                  </option>
                  <option value="Seattle Mariners">Seattle Mariners</option>
                  <option value="St. Louis Cardinals">
                    St. Louis Cardinals
                  </option>
                  <option value="Tampa Bay Rays">Tampa Bay Rays</option>
                  <option value="Texas Rangers">Texas Rangers</option>
                  <option value="Toronto Blue Jays">Toronto Blue Jays</option>
                </NativeSelect>
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            {this.state.players.length > 0 && (
              <PlayerSelect
                players={this.state.players}
                api_url={this.props.api_url}
                getPlayerData={this.getPlayerData}
                refreshPlayerData={this.refreshPlayerData}
              />
            )}
          </Grid>
          {this.state.rawData.length > 0 && (
            <>
              {/* Last 10 Pitches */}
              <Grid item sm={12} md={6}>
                <Container>
                  <Paper className={classes.paper}>
                    <Typography variant="h5">Last 10 Pitches</Typography>
                    <LastSix pitch_data={this.state.lastSix} />
                  </Paper>
                </Container>
              </Grid>
              {/* Last 10 First Pitches */}
              <Grid item sm={12} md={6}>
                <Container>
                  <Paper className={classes.paper}>
                    <Typography variant="h5">Last 10 First Pitches</Typography>
                    <LastFirst pitch_data={this.state.lastFirst} />
                  </Paper>
                </Container>
              </Grid>
              {/* Edge vs Middle Graph */}
              <Grid item sm={12} md={6}>
                <Container>
                  <Paper className={classes.paper}>
                    <Typography variant="h5">
                      Edge vs Middle Pitch Graph
                    </Typography>
                    <div style={{ width: "100%", height: 300 }}>
                      <MediaQuery minWidth={401}>
                        <ResponsiveContainer>
                          <PieChart minWidth={600}>
                            <Pie
                              data={this.state.eVm}
                              dataKey="value"
                              cx="50%"
                              cy="50%"
                              nameKey="name"
                              outerRadius={100}
                              label={this.renderLabel}
                            >
                              {this.state.eVm.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={colors[index]}
                                />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </MediaQuery>
                    </div>
                  </Paper>
                </Container>
              </Grid>
              {/* Pitch matrix */}
              <Grid item sm={12} md={6}>
                <Container>
                  <Paper className={classes.paper}>
                    <Typography variant="h5">Pitch Matrix</Typography>
                    <PitchMatrix pitch_data={this.state.matrix} />
                  </Paper>
                </Container>
              </Grid>
              {/* Following Pitch Matrix */}
              <Grid item sm={12} md={6}>
                <Container>
                  <Paper className={classes.paper}>
                    <Typography variant="h5">Following Pitch Matrix</Typography>
                    <Typography variant="body1">
                      Inital Pitch is on the top row and following pitch range
                      as you go down.
                    </Typography>
                    <FollowingMatrix pitch_data={this.state.following} />
                  </Paper>
                </Container>
              </Grid>
              {/*  Change Matrix */}
              <Grid item sm={12} md={6}>
                <Container>
                  <Paper className={classes.paper}>
                    <Typography variant="h5">Change Matrix</Typography>
                    <ChangeMatrix pitch_data={this.state.changeMatrix} />
                  </Paper>
                </Container>
              </Grid>
              <Grid item xs={12} md={6}>

                <Paper className={classes.paper}>
                  <Typography variant="h5">Double Down Analysis</Typography>
                  <br />
                  <Grid container>
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>
                        <DoubleDown data={this.state.double_down} />
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>
                        <DoubleDownResults
                          res={this.state.double_down_results}
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              {/* Bounceback */}
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <Typography variant="h5">Bounceback</Typography>
                  <Bounceback data={this.state.bounceback}/>
                </Paper>
              </Grid>
              {/*  Current Game */}
              <Grid item xs={12}>
                <CurrentGame data={this.state.current_game} />
              </Grid>
              {/* First Inning Pitching */}
              <Grid item xs={12} sm={6} md={3}>
                <Container className={classes.container}>
                  <Paper className={classes.paper}>
                    <FirstInning pitch_data={this.state.firstInning} />
                  </Paper>
                </Container>
              </Grid>
              {/*  Jumps */}
              <Grid item xs={12} sm={6} md={3}>
                <Container className={classes.container}>
                  <Paper className={classes.paper}>
                    <Jumps pitch_data={this.state.jumps} />
                  </Paper>
                </Container>
              </Grid>
              {/*Last 20 Pitch Graph */}
              <Grid item xs={12}>
                <Container>
                  <Paper className={classes.paper}>
                    <Typography variant="h5">Last 20 Pitch Graph</Typography>
                    <div style={{ width: "100%", height: 400 }}>
                      <MediaQuery minWidth={401}>
                        <ResponsiveContainer width="100%">
                          <LineChart height={250} data={this.state.last20}>
                            <CartesianGrid strokeDasharray="200 20" />
                            <XAxis
                              dataKey="index"
                              name="Pitch Number"
                              unit=""
                            />
                            <YAxis
                              type="number"
                              domain={[0, 1000]}
                              yAxisId="left"
                            />
                            <YAxis yAxisId="right" />
                            <Tooltip cursor={{ strokeDasharray: "200 20" }} />
                            <Legend />
                            <Line
                              name="Pitch"
                              dataKey="pitch"
                              stroke="#d12e72"
                              yAxisId="left"
                              label={<CustomLabel />}
                            />
                            <Line
                              name="Swing"
                              dataKey="swing"
                              stroke="#f5a433"
                              yAxisId="left"
                              label={<CustomLabel />}
                            />

                            <Line
                              name="Difference"
                              dataKey="diff"
                              stroke="#31d6b0"
                              yAxisId="left"
                              label={<CustomLabel2 data={this.state.last20} />}
                            />
                            {/* <Line name="Result" dataKey="result" stroke="#cc8899" yAxisId="right" label={<CustomLabel />}/> */}
                          </LineChart>
                        </ResponsiveContainer>
                      </MediaQuery>
                    </div>
                  </Paper>
                </Container>
              </Grid>
              {/* Range Graph */}
              <Grid item xs={12}>
                <Container>
                  <Paper className={classes.paper}>
                    <Typography variant="h5">Range Graph</Typography>
                    <div style={{ width: "100%", height: 400 }}>
                      <MediaQuery minWidth={401}>
                        <ResponsiveContainer width="100%">
                          <AreaChart
                            // width={730}
                            height={250}
                            data={this.state.matrix}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="range" />
                            <YAxis />
                            <Tooltip />
                            {/* <Legend /> */}
                            <Area
                              name="Pitches"
                              dataKey="total"
                              stroke="#68c42b"
                              type="step"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </MediaQuery>
                    </div>
                  </Paper>
                </Container>
              </Grid>
              {/* Individual Pitches */}
              <Grid item xs={12}>
                <Container>
                  <Paper className={classes.paper}>
                    <Typography variant="h5">
                      Individual Pitch Counts
                    </Typography>
                    <div style={{ width: "100%", height: 400 }}>
                      <MediaQuery minWidth={401}>
                        <ResponsiveContainer width="100%">
                          <LineChart
                            // width={730}
                            height={250}
                            data={this.state.counts}
                          >
                            <XAxis
                              dataKey="pitch"
                              name="count"
                              unit=""
                              type="number"
                              domain={[0, 1000]}
                            />
                            <YAxis dataKey="count" name="pitch" unit="" />
                            <Tooltip cursor={{ strokeDasharray: "200 20" }} />
                            <Legend />
                            <Line
                              name="Pitches"
                              dataKey="count"
                              stroke="#8884d8"
                              type="linear"
                              dot={true}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </MediaQuery>
                    </div>
                  </Paper>
                </Container>
              </Grid>
              {/* Raw Data */}
              <Grid item xs={12}>
                <hr />
                <Container className={classes.container}>
                  <RawData
                    pitch_data={this.state.rawData}
                    type="Raw MLR Pitch Data"
                  />
                </Container>
              </Grid>
            </>
          )}
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(PitcherInfo);
