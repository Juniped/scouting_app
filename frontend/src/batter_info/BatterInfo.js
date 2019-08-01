import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Grid, Paper, Container } from '@material-ui/core';
import PlayerSelect from '../data_components/PlayerSelect';
import {PieChart, Pie, Cell, ResponsiveContainer} from 'recharts';
import MediaQuery from 'react-responsive';
import { API_URL } from "../config/Constants";
const colors = ['#DF4400', '#000000'];

const useStyles = theme => ({
    root: {
        flexGrow: 1,
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
    table: {
        padding: theme.spacing(1)
    },
});

function Line(props) {
    var basesOccupied = 0;
    if (props.value['beforeState']['firstOccupied']) {
        basesOccupied++;
    }
    if (props.value['beforeState']['secondOccupied']) {
        basesOccupied++;
    } if (props.value['beforeState']['thirdOccupied']) {
        basesOccupied++;
    }
    return (
        <TableRow>
            <TableCell padding="checkbox">{props.value['pitch']}</TableCell>
            <TableCell padding="checkbox">{props.value['swing']}</TableCell>
            <TableCell padding="checkbox">{props.value['result']}</TableCell>
            <TableCell padding="none" align="center">{basesOccupied}</TableCell>
            <TableCell padding="none" align="center">{props.value['beforeState']['outs']}</TableCell>
            <TableCell padding="checkbox">{props.value['beforeState']['inning']}</TableCell>
            <TableCell padding="none">{props.value['pitcher']['name']}</TableCell>
        </TableRow>
    );
}

class BatterTable extends Component{
    getLines() {
        let d = [];
        for (let i = 0; i < this.props.data.length; i++) {
            d.push(
                <Line value={this.props.data[i]} key={i} />);
        }
        return d;
    }
    render() {
        let body = (
        <>
            <TableHead >
                <TableRow style={{ backroundColor: "#737475" }}>
                    <TableCell padding="checkbox">Pitch</TableCell>
                    <TableCell padding="checkbox">Swing</TableCell>
                    <TableCell padding="checkbox">Result</TableCell>
                    <TableCell padding="none">OBC</TableCell>
                    <TableCell padding="none">Outs</TableCell>
                    <TableCell padding="checkbox">Inning</TableCell>
                    <TableCell padding="none">Pitcher</TableCell>
                </TableRow>
            </TableHead>
            <TableBody stripedrows="true">
                {this.getLines()}
            </TableBody>
        </>
        );
        return (
            <div>
                <MediaQuery minWidth={601}>
                    <Table size="small" >
                        {body}
                    </Table>
                </MediaQuery>
                <MediaQuery maxWidth={600}>
                    <Table size="small"style={{width:'100%'}}>
                        {body}
                    </Table>
                </MediaQuery>
            </div>
        );
    }
}

class BatterInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentTeam: "",
            team: "",
            players: [],
            playerData: [],
            playerFav:"",
            edgeVmiddle: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.getPlayerData = this.getPlayerData.bind(this);
    }
    getTeam(){
        if (this.state.currentTeam === ""){
            this.setState({team:"", players:[], playerData:[], playerFav:"", edge:0, middle:0})
            return;
        }
        let teamName = encodeURIComponent(this.state.currentTeam.trim())
        let url = API_URL + "/get/team/name/" + teamName;
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
        let player_url = API_URL + "/get/batters/team/" + teamID;
        fetch(player_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((result) => {
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
            {currentTeam :event.target.value, players:[]},
            this.getTeam
            );
        
    }
    renderLabel = function (entry) {
        let label = entry.name + "(" + entry.value + ")";
        return label
    }
    getPlayerData(playerID) {
        let url = API_URL + "/info/batter/" + playerID;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((result) => {
            this.setState({ playerData: result.data, playerFav: result.fav, edgeVmiddle: result.edge_vs_middle,});
        })
        .catch(() => {
            console.log('Request Swallowed!');
        });
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
                                    <NativeSelect value={this.state.currentTeam} onChange={this.handleChange} inputProps={{name: 'currentTeam', id: 'team-native-simple',}}>
                                        <option value="" />
                                        <option value="Arizona Diamondbacks">Arizona Diamondbacks</option>
                                        <option value="Atlanta Braves">Atlanta Braves</option>
                                        <option value="Baltimore Orioles">Baltimore Orioles</option>
                                        <option value="Boston Red Sox">Boston Red Sox</option>
                                        <option value="Chicago Cubs">Chicago Cubs</option>
                                        <option value="Chicago White Sox">Chicago White Sox</option>
                                        <option value="Cincinnati Red">Cincinnati Red</option>
                                        <option value="Cleveland Indians">Cleveland Indians</option>
                                        <option value="Colorado Rockies">Colorado Rockies</option>
                                        <option value="Detroit Tigers">Detroit Tigers</option>
                                        <option value="Houston Colt 45's">Houston Colt 45's</option>
                                        <option value="Kansas City Royals">Kansas City Royals</option>
                                        <option value="Los Angeles Angels">Los Angeles Angels</option>
                                        <option value="Los Angeles Dodgers">Los Angeles Dodgers</option>
                                        <option value="Miami Marlins">Miami Marlins</option>
                                        <option value="Milwaukee Brewers">Milwaukee Brewers</option>
                                        <option value="Minnesota Twins">Minnesota Twins</option>
                                        <option value="Montreal Expos">Montreal Expos</option>
                                        <option value="New York Mets">New York Mets</option>
                                        <option value="New York Yankees">New York Yankees</option>
                                        <option value="Oakland Athletics">Oakland Athletics</option>
                                        <option value="Philadelphia Phillies">Philadelphia Phillies</option>
                                        <option value="Pittsburgh Pirates">Pittsburgh Pirates</option>
                                        <option value="San Diego Padres">San Diego Padres</option>
                                        <option value="San Francisco Giants">San Francisco Giants</option>
                                        <option value="Seattle Mariners">Seattle Mariners</option>
                                        <option value="St. Louis Cardinals">St. Louis Cardinals</option>
                                        <option value="Tampa Bay Devil Rays">Tampa Bay Devil Rays</option>
                                        <option value="Texas Rangers">Texas Rangers</option>
                                        <option value="Toronto Blue Jays">Toronto Blue Jays</option>
                                    </NativeSelect>
                                </FormControl>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {this.state.players.length > 0 && <PlayerSelect players={this.state.players} api_url={API_URL} getPlayerData={this.getPlayerData}/> }
                    </Grid>
                    {this.state.playerData.length > 0  && (
                        <>
                        <Grid item sm={12} md={6}>
                            <Container >
                            {/* {this.state.playerData.length > 0 && ( */}
                                <Paper className={classes.paper}>
                                    <Typography className={classes.Title}>
                                        Batter Data
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        Favorite Swing: {this.state.playerFav}
                                    </Typography>
                                    <BatterTable data={this.state.playerData} />
                                </Paper>
                            {/* )} */}
                            </Container>
                        </Grid>
                        <Grid item sm={12} md={6}>
                            <Container>
                                <Paper className={classes.paper} >
                                    <Typography variant="h5">
                                        Edge vs Middle Swing Graph
                                    </Typography>
                                    <div style={{ width: '100%', height: 300}}>
                                        <MediaQuery minWidth={601}>
                                            <ResponsiveContainer>
                                                <PieChart minWidth={600}>
                                                        <Pie data={this.state.edgeVmiddle} dataKey="value" cx="50%" cy="50%" nameKey="name" outerRadius={100} label={this.renderLabel} >
                                                    {
                                                            this.state.edgeVmiddle.map((entry, index) => (
                                                                <Cell key={`cell-${index}`} fill={colors[index]} />
                                                        ))
                                                    }
                                                    </Pie>
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </MediaQuery>
                                            <MediaQuery maxWidth={600}>
                                                <ResponsiveContainer minWidth={400}>
                                                    <PieChart>
                                                        <Pie data={this.state.edgeVmiddle} dataKey="value" cx="50%" cy="50%" nameKey="name" outerRadius={100} label={this.renderLabel} >
                                                            {
                                                                this.state.edgeVmiddle.map((entry, index) => (
                                                                    <Cell key={`cell-${index}`} fill={colors[index]} />
                                                                ))
                                                            }
                                                        </Pie>
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </MediaQuery>
                                    </div> 
                                </Paper>
                            </Container>
                        </Grid>
                    </>
                    )}
                   
                </Grid>
            </div>
        );
    }
}

export default withStyles(useStyles)(BatterInfo);