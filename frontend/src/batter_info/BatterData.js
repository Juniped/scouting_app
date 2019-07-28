import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const useStyles = theme => ({
    root: {
        overflowX: 'auto',
        margin: theme.spacing(1),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    title: {
        fontSize: 14,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});


class BatterData extends Component{
    render(){
        const { classes } = this.props;
        return(
            <Paper className={classes.paper}>
                <Typography className={classes.Title}>
                    Batter Data
                </Typography>   
            </Paper>
        )
    }
}

export default withStyles(useStyles)(BatterData);