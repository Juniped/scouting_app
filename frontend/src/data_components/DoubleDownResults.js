import React, { Component } from "react";
import { withStyles} from '@material-ui/core/styles';
import { Grid, Box, Paper, Card, Typography, CardContent } from "@material-ui/core";
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

class ResultsTable extends Component{
    render(){
        const {classes } = this.props;
        let body = (
            <><TableHead>
                <TableRow>
                    <TableCell align="center">Result</TableCell>
                    <TableCell align="center">Double Down Count</TableCell>
                    <TableCell align="center">Total Results</TableCell>
                    <TableCell align="center">Percentage</TableCell>

                </TableRow>
            </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align="center">HR</TableCell>
                        <TableCell align="center">{this.props.res.count.HR}</TableCell>
                        <TableCell align="center">{this.props.res.total.HR}</TableCell>
                        <TableCell align="center">{this.props.res.math.HR}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">3B</TableCell>
                        <TableCell align="center">{this.props.res.count._3B}</TableCell>
                        <TableCell align="center">{this.props.res.total._3B}</TableCell>
                        <TableCell align="center">{this.props.res.math._3B}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">2B</TableCell>
                        <TableCell align="center">{this.props.res.count._2B}</TableCell>
                        <TableCell align="center">{this.props.res.total._2B}</TableCell>
                        <TableCell align="center">{this.props.res.math._2B}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">1B</TableCell>
                        <TableCell align="center">{this.props.res.count._1B}</TableCell>
                        <TableCell align="center">{this.props.res.total._1B}</TableCell>
                        <TableCell align="center">{this.props.res.math._1B}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">BB</TableCell>
                        <TableCell align="center">{this.props.res.count.BB}</TableCell>
                        <TableCell align="center">{this.props.res.total.BB}</TableCell>
                        <TableCell align="center">{this.props.res.math.BB}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">FO</TableCell>
                        <TableCell align="center">{this.props.res.count.FO}</TableCell>
                        <TableCell align="center">{this.props.res.total.FO}</TableCell>
                        <TableCell align="center">{this.props.res.math.FO}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">K</TableCell>
                        <TableCell align="center">{this.props.res.count.K}</TableCell>
                        <TableCell align="center">{this.props.res.total.K}</TableCell>
                        <TableCell align="center">{this.props.res.math.K}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">PO</TableCell>
                        <TableCell align="center">{this.props.res.count.PO}</TableCell>
                        <TableCell align="center">{this.props.res.total.PO}</TableCell>
                        <TableCell align="center">{this.props.res.math.PO}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">RGO</TableCell>
                        <TableCell align="center">{this.props.res.count.RGO}</TableCell>
                        <TableCell align="center">{this.props.res.total.RGO}</TableCell>
                        <TableCell align="center">{this.props.res.math.RGO}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">LGO</TableCell>
                        <TableCell align="center">{this.props.res.count.LGO}</TableCell>
                        <TableCell align="center">{this.props.res.total.LGO}</TableCell>
                        <TableCell align="center">{this.props.res.math.LGO}</TableCell>
                    </TableRow><TableRow>
                        <TableCell align="center">Total</TableCell>
                        <TableCell align="center">{this.props.res.count.total}</TableCell>
                        <TableCell align="center">{this.props.res.total.total}</TableCell>
                        <TableCell align="center">{this.props.res.math.total}</TableCell>
                    </TableRow>
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


class DoubleDownResults extends Component{
    render(){
        const{ classes } = this.props;
        return(
            <div className={classes.root}>
                <ResultsTable res={this.props.res} />
            </div>
        )
    }
}

export default withStyles(useStyles)(DoubleDownResults);