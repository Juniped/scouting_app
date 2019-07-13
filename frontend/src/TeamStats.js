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
    render(){
        return(
            <div className="Team Stats">
                <h1> Coming Soon </h1>
            </div>
        );
    }
}

export default withStyles(styles)(TeamStats)