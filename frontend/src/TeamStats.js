import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
})

class TeamStats extends Component {
    constructor(props) {
        super(props);
        this.state = {
          currentTeam: "",
          team: "",
          players: [],

        };
        this.handleChange = this.handleChange.bind(this);
        this.getPlayerData = this.getPlayerData.bind(this);
      }
    render(){
        return(
            <div className="Team Stats">
                
            </div>
        );
    }
}

export default withStyles(styles)(TeamStats)