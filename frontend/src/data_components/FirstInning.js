import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    root: {
        overflowX: 'auto',
        margin: theme.spacing(1),
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
});
function Cell(props) {
    let val = props.value;
    var color_value = 0xEEEEEE
    var sub_color = 0x110011 * val
    var result = color_value = color_value - sub_color;
    var colorHex = "#" + result.toString(16)
    let colorStyle = { backgroundColor: colorHex };
    return (
        <TableCell style={colorStyle}>{props.value}</TableCell>
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
            <TableCell component="th" scope="row">{props.value['range']}</TableCell>
            {getCell(props.value['count'])}
        </TableRow>
    );
}

class FirstInning extends Component {
    constructor(props) {
        super(props);
    }
    getLines() {
        let d = [];
        for (let i = 0; i < this.props.pitch_data.length; i++) {
            d.push(
                <Line value={this.props.pitch_data[i]} key={i} />);
        }
        return d;
    }
    render() {
        return (
            <div className="First Inning Root">
                <h3>First Inning Pitches</h3>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Range</TableCell>
                            <TableCell>Count</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.getLines()}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default withStyles(useStyles)(FirstInning);