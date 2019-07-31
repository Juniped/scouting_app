import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import {Typography, Paper } from '@material-ui/core';

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
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


class PlayerSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayer: "",
        }
        this.handleChange = this.handleChange.bind(this);
    }
    getOptions() {
        let d = [];
        for (let i = 0; i < this.props.players.length; i++) {
            let player = this.props.players[i]
            d.push(<option value={player.id} key={i}> {player.name} </option>)
        }
        return d;
    }
    handleChange(event) {
        this.props.getPlayerData(event.target.value);
        this.setState(
            { currentPlayer: event.target.value },
            );
    }
    render() {
        const { classes } = this.props;
        return (

            <Paper className={classes.paper} >
                    <Typography className={classes.Title} color="textSecondary" gutterBottom>
                        Select a Player
                    </Typography>
                    <FormControl className={classes.formControl}>
                        <NativeSelect value={this.state.currentPlayer} onChange={this.handleChange} inputProps={{ name: 'currentPlayer', id: 'player-native-simple', }}>
                            <option value="" />
                            {this.getOptions()}
                        </NativeSelect>
                    </FormControl>
            </Paper>

        )
    }
}
export default withStyles(useStyles)(PlayerSelect);