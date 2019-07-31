
import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles} from '@material-ui/core/styles';
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
    table: {
        minWidth: 550,
    },
});

function Line(props) {
    return (
        <TableRow>
            <TableCell>{props.value['pitch']}</TableCell>
            <TableCell>{props.value['swing']}</TableCell>
            <TableCell>{props.value['result']}</TableCell>
            <TableCell>{props.value['diff']}</TableCell>
        </TableRow>
    );
}

class LastFirst extends Component {
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
            <Table size="small" padding="checkbox" hover="true">
                <TableHead>
                    <TableRow>
                        <TableCell>Pitch</TableCell>
                        <TableCell>Swing</TableCell>
                        <TableCell>Result</TableCell>
                        <TableCell>Diff</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.getLines()}
                </TableBody>
            </Table>
        );
    }
}
export default withStyles(useStyles)(LastFirst);
