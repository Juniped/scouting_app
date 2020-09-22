import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { Typography, Grid, Paper, Container, Box } from "@material-ui/core";
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
  AreaChart
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
import CurrentGame from "../data_components/CurrentGame";
import FollowingMatrix from "../data_components/FollowingMatrix";

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

class FCB
 extends Component {
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
      jumps: [],
      lastFirst: [],
      counts: [],
      changeMatrix: [],
      milrData: [],
      double_down: [],
      double_down_results: [],
      current_game: [],
      last20: [],
      following: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.getPlayerData = this.getPlayerData.bind(this);
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
        following: []
      });
      return;
    }
    let teamName = encodeURIComponent(this.state.currentTeam.trim());
    let url = API_URL + "/get/fcb/team/name/" + teamName;
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
    let player_url = API_URL + "/get/fcb/pitchers/team/" + teamID;
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
    let url = API_URL + "/info/fcb/pitcher/" + playerID;
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
          double_down: result.double_down,
          double_down_results: result.double_down_results,
          current_game: result.current_game,
          last20: result.last20,
          following: result.following
        });
      })
      .catch(error => {
        console.log(error);
        console.log("Request Swallowed!");
      });
    // Get Counts Seperate
    let counturl = API_URL + "/info/fcb/pitcher/counts/" + playerID;
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
      .catch(error => {
        console.log(error);
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
                    id: "team-native-simple"
                  }}
                >
                  <option value="" />
                  <option value="Arizona Diamondbacks">
                    Arizona Diamondbacks
                  </option>
                  <option value="Coastal Carolina Chanticleers">Coastal Carolina Chanticleers</option>
                  <option value="Georgia Tech Yellow Jackets">Georgia Tech Yellow Jackets</option>
                  <option value="Louisville Cardinals">Louisville Cardinals</option>
                  <option value="Nebraska Cornhuskers">Nebraska Cornhuskers</option>
                  <option value="North Carolina State University">North Carolina State University</option>
                  <option value="North Carolina Tar Heels">North Carolina Tar Heels</option>
                  <option value="Sarah Lawrence College">Sarah Lawrence College</option>
                  <option value="Wichita State Shockers">Wichita State Shockers</option>
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
              />
            )}
          </Grid>
          {this.state.rawData.length > 0 && (
            <>
              <Grid item sm={12} md={6}>
                <Container>
                  <Paper className={classes.paper}>
                    <Typography variant="h5">Last 10 Pitches</Typography>
                    <LastSix pitch_data={this.state.lastSix} />
                  </Paper>
                </Container>
              </Grid>
              <Grid item sm={12} md={6}>
                <Container>
                  <Paper className={classes.paper}>
                    <Typography variant="h5">Last 10 First Pitches</Typography>
                    <LastFirst pitch_data={this.state.lastFirst} />
                  </Paper>
                </Container>
              </Grid>
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
                      <MediaQuery maxWidth={600}>
                        <ResponsiveContainer minWidth={300}>
                          <PieChart>
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
              <Grid item sm={12} md={6}>
                <Container>
                  <Paper className={classes.paper}>
                    <Typography variant="h5">Pitch Matrix</Typography>
                    <PitchMatrix pitch_data={this.state.matrix} />
                  </Paper>
                </Container>
              </Grid>
              <Grid item sm={12} md={6}>
                <Container>
                  <Paper className={classes.paper}>
                    <Typography variant="h5">Following Pitch Matrix</Typography>
                    <Typography variant="p">
                      Inital Pitch is on the top row and following pitch range
                      as you go down.
                    </Typography>
                    <FollowingMatrix pitch_data={this.state.following} />
                  </Paper>
                </Container>
              </Grid>
              <Grid item sm={12} md={6}>
                <Container>
                  <Paper className={classes.paper}>
                    <Typography variant="h5">Change Matrix</Typography>
                    <ChangeMatrix pitch_data={this.state.changeMatrix} />
                  </Paper>
                </Container>
              </Grid>
              <Grid item xs={12} md={6}>
                {/* <Container> */}

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
              <Grid item xs={12}>
                <CurrentGame data={this.state.current_game} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Container className={classes.container}>
                  <Paper className={classes.paper}>
                    <FirstInning pitch_data={this.state.firstInning} />
                  </Paper>
                </Container>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Container className={classes.container}>
                  <Paper className={classes.paper}>
                    <Jumps pitch_data={this.state.jumps} />
                  </Paper>
                </Container>
              </Grid>

              <Grid item xs={12}>
                {/*Last 10 Pitch Graph */}
                <Container>
                  <Paper className={classes.paper}>
                    <Typography variant="h5">Last 20 Pitch Graph</Typography>
                    <div style={{ width: "100%", height: 400 }}>
                      <MediaQuery minWidth={401}>
                        <ResponsiveContainer width="100%">
                          <LineChart
                            // width={730}
                            height={250}
                            data={this.state.last20}
                          >
                            <CartesianGrid strokeDasharray="200 20" />
                            <XAxis
                              dataKey="index"
                              name="Pitch Number"
                              unit=""
                            />
                            <YAxis type="number" domain={[0, 1000]} />
                            <Tooltip cursor={{ strokeDasharray: "200 20" }} />
                            <Legend />
                            <Line
                              name="Pitch"
                              dataKey="pitch"
                              stroke="#d12e72"
                              type="linear"
                            />
                            <Line
                              name="Difference"
                              dataKey="diff"
                              stroke="#31d6b0"
                              type="linear"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </MediaQuery>
                    </div>
                  </Paper>
                </Container>
              </Grid>
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

              <Grid item xs={12}>
                <hr />
                <Container className={classes.container}>
                  <RawData
                    pitch_data={this.state.rawData}
                    type="Raw FCB Pitch Data"
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

export default withStyles(useStyles)(FCB
    );
