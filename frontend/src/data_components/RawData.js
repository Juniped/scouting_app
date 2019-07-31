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
                        <TableCell align="center" style={{ padding: 5 }} >Swing</TableCell>
                        <TableCell align="center"  style={{padding:5}} >Result</TableCell>
                        <TableCell align="center"  style={{padding:5}} >Diff</TableCell>
                        <TableCell align="center" style={{ padding: 5 }} >OBC</TableCell>
                        <TableCell align="center"  style={{padding:5}} >Outs</TableCell>
                        <TableCell align="center" style={{ padding: 5 }}>Inning</TableCell>
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
                    <Table size="small" padding="checkbox">
                        {body}
                    </Table>
                </MediaQuery>
                <MediaQuery maxWidth={660}>
                    <Table size="small" padding="none" style={{ width: '100%' }}>
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
                        <Typography className={classes.heading}>Raw Pitch Data</Typography>
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