import React, { Component } from "react";
import { withStyles} from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import MediaQuery from 'react-responsive';


const useStyles = theme => ({
    root: {
        overflowX: 'auto',
        margin: theme.spacing(1),
        flexGrow: 1
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    button: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        backgroundColor: "#fb4f14",
    },
    paper: {
        padding: theme.spacing(3, 2),
    },
    table: {
        minWidth: 550,
    },
    tableSmall:{
        padding:theme.spacing(1),
    },
    paperdark:{
        backgroundColor: "#f5f5f5",
        padding: theme.spacing(3, 2),
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});


function Cell(props) {
    let val = props.value;
    return (
        <TableCell align="center">{props.value}</TableCell>
    );
}

function Line(props) {
    function getCell(value) {
        return (
            <Cell value={value} />
        )
    }
    return (
        <TableRow>
            {getCell(props.value['pitch_1'])}
            {getCell(props.value['pitch_2'])}
            {getCell(props.value['result_1'])}
            {getCell(props.value['result_2'])}
        </TableRow>
    );
}

class RawTable extends Component{
    getLines() {
        let d = [];
        for (let i = 0; i < this.props.data.length; i++) {
            d.push(
                <Line value={this.props.data[i]} key={i} />);
        }
        return d;
    }
    render(){
        const {classes } = this.props;
        let body = (
            <><TableHead>
                <TableRow>
                    <TableCell align="center">1st Pitch</TableCell>
                    <TableCell align="center">2nd Pitch</TableCell>
                    <TableCell align="center">1st Result</TableCell>
                    <TableCell align="center">2nd Result</TableCell>
                </TableRow>
            </TableHead>
                <TableBody>
                    {this.getLines()}
                </TableBody>
            </>
        )
        return (
            <div>
                <MediaQuery minWidth={1346}>
                    <Table size="small" padding="checkbox">
                        {body}
                    </Table>
                </MediaQuery>
                <MediaQuery maxWidth={1345}>
                    <Table size="small" padding="none" style={{ width: '100%' }}>
                        {body}
                    </Table>
                </MediaQuery>
            </div>
        )
    }
}


class DoubleDown extends Component{
    render(){
        const{ classes } = this.props;
        return(
            <div className={classes.root}>
                <RawTable data={this.props.data} />
            </div>
        )
    }
}

export default withStyles(useStyles)(DoubleDown);