import React, { Component } from 'react';

import { withStyles} from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const rawStyles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        margin: theme.spacing(1),
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});

function RawLine(props) {
    var homeColor = "#" + props.value['game']['homeTeam']['colorDiscord'].toString(16);
    var homeStyle = {backgroundColor:homeColor};
    var awayColor = "#" + props.value['game']['awayTeam']['colorDiscord'].toString(16);
    var awayStyle = {backgroundColor:awayColor};
    var basesOccupied = 0;
    if (props.value['beforeState']['firstOccupied']){
        basesOccupied ++;
    }
    if (props.value['beforeState']['secondOccupied']){
        basesOccupied ++;
    }if (props.value['beforeState']['thirdOccupied']){
        basesOccupied ++;
    }
    return (
        <TableRow>
            <TableCell>{props.value['pitch']}</TableCell>
            <TableCell>{props.value['swing']}</TableCell>
            <TableCell>{props.value['result']}</TableCell>
            <TableCell>{props.value['diff']}</TableCell>
            <TableCell>{basesOccupied}</TableCell>
            {/* <TableCell>{props.value['beforeState']['secondOccupied']}</TableCell>
            <TableCell>{props.value['beforeState']['thirdOccupied']}</TableCell> */}
            <TableCell style={homeStyle}>{props.value['game']['homeTeam']['tag']}</TableCell>
            <TableCell style={awayStyle}>{props.value['game']['awayTeam']['tag']}</TableCell>
            <TableCell>{props.value['beforeState']['outs']}</TableCell>
            <TableCell>{props.value['beforeState']['inning']}</TableCell>
            <TableCell>{props.value['batter']['name']}</TableCell>
        </TableRow>
    );
}

class RawDataTable extends Component{
    getLines() {
        let d = [];
        for (let i = 0; i < this.props.pitch_data.length; i++) {
            d.push(
                <RawLine value={this.props.pitch_data[i]} key={i} />);
        }
        return d;
    }
    render() {
        const loading = this.props.loading;
        let body = loading ?
            (<div className="has-text-centered">
            </div>) :
            (
                <Table size="small" padding="checkbox" hover="true">
                    <TableHead >
                        <TableRow style={{backroundColor:"#737475"}}>
                            <TableCell>Pitch</TableCell>
                            <TableCell>Swing</TableCell>
                            <TableCell>Result</TableCell>
                            <TableCell>Diff</TableCell>
                            <TableCell>Bases Occupied</TableCell>
                            <TableCell>Home Team</TableCell>
                            <TableCell>Away Team</TableCell>
                            <TableCell>Outs</TableCell>
                            <TableCell>Inning</TableCell>
                            <TableCell>Batter</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody stripedrows>
                        {this.getLines()}
                    </TableBody>
                </Table>
            );
        return (
            <div>{body}</div>
        );
    }
}

class RawData extends Component{
    constructor(props) {
        super(props);
        this.state = {
            pitch_data: [],
            loading: true,
        }
        this.getData = this.getData.bind(this);
        this.addData = this.addData.bind(this);
    }
    componentDidMount() {
        this.getData();
    }
    componentDidUpdate(prevProps) {
        if (this.props.player !== prevProps.player) {
            this.getData();
        }
    }
    getData() {
        this.setState({ loading: true, pitch_data: [] });
        if (this.props.player === undefined) {
            return;
        }
        let player_name = encodeURIComponent(this.props.player.trim());
        let url = this.props.api_url + "/api/info/raw/" + player_name;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((result) => {
                const pitch_data = this.state.pitch_data.slice();
                let new_pitches = [];
                for (let i = 0; i < result.length; i++) {
                    let res = result[i];
                    new_pitches.push(res);
                }
                this.setState({
                    pitch_data: pitch_data.concat(new_pitches),
                    loading: false,
                });
            })
            .catch(() => {
                console.log('Request Swallowed!');
            });
    }
    addData(i) {
        const pitch_data = this.state.pitch_data.slice();
        let new_data = []
        new_data.push(i);
        this.setState({
            pitch_data: pitch_data.concat(new_data),
        });
    }
    render(){
        const { classes } = this.props;
        return(
            <Box>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography className={classes.heading}>Raw Pitch Data</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <RawDataTable pitch_data={this.state.pitch_data} />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Box>
        );
    }
}

export default withStyles(rawStyles)(RawData);