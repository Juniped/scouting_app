import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from '@material-ui/core';
import MediaQuery from 'react-responsive';
import { withStyles} from '@material-ui/core/styles';
import { mergeClasses } from '@material-ui/styles';

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
    tableSmall:{
        padding:theme.spacing(1),
    }
});
function Cell(props) {
    let val = props.value;
    var color_value = 0xEEEEEE
    var sub_color = 0x111111 * val
    var result = color_value = color_value - sub_color;
    var colorHex = "#" + result.toString(16)
    let colorStyle = { backgroundColor: colorHex };
    return (
        <TableCell align="center" style={colorStyle}>{props.value}</TableCell>
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
            {getCell(props.value['HR'])}
            {getCell(props.value['3B'])}
            {getCell(props.value['2B'])}
            {getCell(props.value['1B'])}
            {getCell(props.value['BB'])}
            {getCell(props.value['FO'])}
            {getCell(props.value['K'])}
            {getCell(props.value['PO'])}
            {getCell(props.value['LGO'])}
            {getCell(props.value['RGO'])}
            <TableCell align="center" style={{ backgroundColor:"#cfed9a"}}>{props.value['total']}</TableCell>
        </TableRow>
    );
}

class PitchMatrix extends Component {
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
        const { classes } = this.props;
        let body = (<><TableHead>
            <TableRow>
                <TableCell>Range</TableCell>
                <TableCell>HR</TableCell>
                <TableCell>3B</TableCell>
                <TableCell>2B</TableCell>
                <TableCell>1B</TableCell>
                <TableCell>BB</TableCell>
                <TableCell>FO</TableCell>
                <TableCell style={{padding:2}}>K</TableCell>
                <TableCell>PO</TableCell>
                <TableCell>LGO</TableCell>
                <TableCell>RGO</TableCell>
                <TableCell>Total</TableCell>
            </TableRow>
        </TableHead>
            <TableBody>
                {this.getLines()}
            </TableBody>
            </>
        )
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
        )
    }
}

export default withStyles(useStyles)(PitchMatrix);