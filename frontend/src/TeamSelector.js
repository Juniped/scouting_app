import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import {
  Typography,
  Paper,
} from "@material-ui/core";


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
});

class TeamSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTeam: "",
      team: "",
    };
    this.handleChange = this.handleChange.bind(this);
    // this.getPlayerData = this.getPlayerData.bind(this);
  }
  renderLabel = function(entry) {
    let label = entry.name + "(" + entry.value + ")";
    return label;
  };
  
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
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
                  value={this.props.currentTeam}
                  onChange={this.props.handleChange}
                  inputProps={{
                    name: "currentTeam",
                    id: "team-native-simple"
                  }}
                >
                  <option value="" />
                  <option value="Arizona Diamondbacks">
                    Arizona Diamondbacks
                  </option>
                  <option value="Atlanta Braves">Atlanta Braves</option>
                  <option value="Baltimore Orioles">
                    Baltimore Orioles
                  </option>
                  <option value="Boston Red Sox">Boston Red Sox</option>
                  <option value="Chicago Cubs">Chicago Cubs</option>
                  <option value="Chicago White Sox">
                    Chicago White Sox
                  </option>
                  <option value="Cincinnati Red">Cincinnati Red</option>
                  <option value="Cleveland Indians">
                    Cleveland Indians
                  </option>
                  <option value="Colorado Rockies">Colorado Rockies</option>
                  <option value="Detroit Tigers">Detroit Tigers</option>
                  <option value="Houston Colt 45's">
                    Houston Colt 45's
                  </option>
                  <option value="Kansas City Royals">
                    Kansas City Royals
                  </option>
                  <option value="Los Angeles Angels">
                    Los Angeles Angels
                  </option>
                  <option value="Los Angeles Dodgers">
                    Los Angeles Dodgers
                  </option>
                  <option value="Miami Marlins">Miami Marlins</option>
                  <option value="Milwaukee Brewers">
                    Milwaukee Brewers
                  </option>
                  <option value="Minnesota Twins">Minnesota Twins</option>
                  <option value="Montreal Expos">Montreal Expos</option>
                  <option value="New York Mets">New York Mets</option>
                  <option value="New York Yankees">New York Yankees</option>
                  <option value="Oakland Athletics">
                    Oakland Athletics
                  </option>
                  <option value="Philadelphia Phillies">
                    Philadelphia Phillies
                  </option>
                  <option value="Pittsburgh Pirates">
                    Pittsburgh Pirates
                  </option>
                  <option value="San Diego Padres">San Diego Padres</option>
                  <option value="San Francisco Giants">
                    San Francisco Giants
                  </option>
                  <option value="Seattle Mariners">Seattle Mariners</option>
                  <option value="St. Louis Cardinals">
                    St. Louis Cardinals
                  </option>
                  <option value="Tampa Bay Devil Rays">
                    Tampa Bay Devil Rays
                  </option>
                  <option value="Texas Rangers">Texas Rangers</option>
                  <option value="Toronto Blue Jays">
                    Toronto Blue Jays
                  </option>
                </NativeSelect>
              </FormControl>
            </Paper>
      </div>
    );
  }
}

export default withStyles(useStyles)(TeamSelector);
