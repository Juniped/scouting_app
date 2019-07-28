import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { Table, Card, CardContent, Typography, Grid, Paper } from '@material-ui/core';
import PlayerSelect from './PlayerSelect';
let config = require('../config/config.json');


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




class BatterInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentTeam: "",
            team: "",
            players: [],
        }
        this.handleChange = this.handleChange.bind(this);
    }
    getTeam(){
        if (this.state.currentTeam === ""){
            this.setState({team:""})
            return;
        }
        let teamName = encodeURIComponent(this.state.currentTeam.trim())
        let url = this.props.api_url + "/api/get/team/name/" + teamName;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((result) => {
            this.setState(
                {team:result[0]},
                this.getPlayers
                );
        })
        .then(() =>{
            this.getPlayers();
        })
        .catch((error) => {
            console.log(error);
            console.log('Request Swallowed!');
        });
    }
    getPlayers(){
        let teamID = this.state.team.tag;
        let player_url = this.props.api_url + "/api/get/players/team/" + teamID;
        fetch(player_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                this.setState({ players: result });
            })
            .catch((error) => {
                console.log(error);
                console.log('Request Swallowed!');
            });
    }
    handleChange(event){
        event.preventDefault();
        this.setState(
            {currentTeam :event.target.value},
            this.getTeam
            );
        
    }
    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                                <Typography className={classes.Title} color="textSecondary" gutterBottom>
                                    Select a Team
                                </Typography>
                                <FormControl className={classes.formControl}>
                                    <NativeSelect native value={this.state.currentTeam} onChange={this.handleChange} inputProps={{name: 'currentTeam', id: 'team-native-simple',}}>
                                        <option value="" />
                                        <option value="Arizona Diamondbacks">Arizona Diamondbacks</option>
                                        <option value="Atlanta Braves">Atlanta Braves</option>
                                        <option value="Baltimore Orioles">Baltimore Orioles</option>
                                        <option value="Boston Red Sox">Boston Red Sox</option>
                                        <option value="Chicago Cubs">Chicago Cubs</option>
                                        <option value="Chicago White Sox">Chicago White Sox</option>
                                        <option value="Cintinnati Reds">Cintinnati Reds"</option>
                                        <option value="Cleveland Indians">Cleveland Indians</option>
                                        <option value="Colorado Rockies">Colorado Rockies</option>
                                        <option value="Detroit Tigers">Detroit Tigers</option>
                                        <option value="Huston Colt 45's">Huston Colt 45's</option>
                                        <option value="Kansas City Royals">Kansas City Royals</option>
                                        <option value="Los Angeles Angels">Los Angeles Angels</option>
                                        <option value="Los Angeles Dodgers">Los Angeles Dodgers</option>
                                        <option value="Miama Marlins">Miama Marlins</option>
                                        <option value="Milwaukee Brewers">Milwaukee Brewers</option>
                                        <option value="Minnesota Twins">Minnesota Twins</option>
                                        <option value="Montral Expos">Montral Expos</option>
                                        <option value="New York Mets">New York Mets</option>
                                        <option value="New York Yankees">New York Yankees"</option>
                                        <option value="Oakland Athletics">Oakland Athletics</option>
                                        <option value="Philidelphia Phillies">Philidelphia Phillies</option>
                                        <option value="Pittsburgh Pirates">Pittsburgh Pirates</option>
                                        <option value="San Diego Padres">San Diego Padres</option>
                                        <option value="San Francisco Giants">San Francisco Giants</option>
                                        <option value="St. Louis Cardinals">St. Louis Cardinals</option>
                                        <option value="Tama Bay Devil Rays">Tama Bay Devil Rays</option>
                                        <option value="Texas Rangers">Texas Rangers</option>
                                        <option value="Torono Blue Jays">Torono Blue Jays</option>
                                    </NativeSelect>
                                </FormControl>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {this.state.players.length > 0 && <PlayerSelect players={this.state.players} /> }
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(useStyles)(BatterInfo);