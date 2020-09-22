import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import { withStyles} from '@material-ui/core/styles';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '@material-ui/core/';
import {Typography, Box} from '@material-ui/core/';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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
            <TableCell align="center" style={{ padding: 5 }}>{props.value['pitch']}</TableCell>
            <TableCell align="center" style={{ padding: 5 }}>{props.value['swing']}</TableCell>
            <TableCell align="center" style={{ padding: 5 }}>{props.value['result']}</TableCell>
            <TableCell align="center" style={{ padding: 5 }}>{props.value['diff']}</TableCell>
            <TableCell align="center" style={{ padding: 5 }}>{basesOccupied}</TableCell>
            <TableCell align="center" style={{padding:5}} >{props.value['beforeState']['outs']}</TableCell>
            <TableCell align="center" style={{ padding: 5 }}>{props.value['beforeState']['inning']}</TableCell>
            <TableCell style={homeStyle}>{props.value['game']['homeTeam']['tag']}</TableCell>
            <TableCell style={awayStyle}>{props.value['game']['awayTeam']['tag']}</TableCell>
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
        let body = (
            <>
                <TableHead >
                    <TableRow style={{backroundColor:"#737475"}}>
                        <TableCell align="center"  style={{padding:5}}>Pitch</TableCell>
                        <TableCell align="center" style={{ padding:5}} >Swing</TableCell>
                        <TableCell align="center"  style={{padding:5}} >Result</TableCell>
                        <TableCell align="center"  style={{padding:5}} >Diff</TableCell>
                        <TableCell align="center" style={{ padding:5}} >OBC</TableCell>
                        <TableCell align="center"  style={{padding:5}} >Outs</TableCell>
                        <TableCell align="center" style={{ padding:5}}>Inning</TableCell>
                        <TableCell align="center" style={{ padding:5}}>Home Team</TableCell>
                        <TableCell align="center" style={{ padding:5}}>Away Team</TableCell>
                        <TableCell align="center" style={{ padding:5}}>Batter</TableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody stripedrows="true">
                    {this.getLines()}
                </TableBody>
            </>
        );
        return (
          <div>
            <MediaQuery minWidth={661}>
              <Table size="small" padding="checkbox" stickyHeader>
                {body}
              </Table>
            </MediaQuery>
            <MediaQuery maxWidth={660}>
              <Table size="small" padding="none" style={{ width: "100%" }}>
                {body}
              </Table>
            </MediaQuery>
          </div>
        );
    }
}

class RawData extends Component{
    render(){
        const { classes } = this.props;
        return(
            <Box>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography className={classes.heading}>{this.props.type}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <RawDataTable pitch_data={this.props.pitch_data} />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Box>
        );
    }
}

export default withStyles(rawStyles)(RawData);