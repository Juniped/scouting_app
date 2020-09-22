import React, { Component } from "react";
 import { withStyles } from "@material-ui/core/styles";
 import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
 import MediaQuery from "react-responsive";
 const useStyles = (theme) => ({
   root: {
     overflowX: "auto",
     margin: theme.spacing(1),
     flexGrow: 1,
   },
   paper: {
     padding: theme.spacing(3, 2),
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
        {getCell(props.value["p1"]["pitch"])}
        {getCell(props.value["p1"]["result"])}
        {getCell(props.value["p2"]["pitch"])}
        {getCell(props.value["p2"]["result"])}
        {getCell(props.value["p3"]["pitch"])}
      </TableRow>
    );
}

 class DataTable extends Component{
    getLines() {
        let d = [];
        for (let i = 0; i < this.props.data.length; i++) {
            d.push(
                <Line value={this.props.data[i]} key={i} />);
        }
        return d;
    }
     render(){
         let body = (
           <>
             <TableHead>
               <TableRow>
                 <TableCell align="center">Pitch 1</TableCell>
                 <TableCell align="center">Result 1</TableCell>
                 <TableCell align="center">Pitch 2</TableCell>
                 <TableCell align="center">Result 2</TableCell>
                 <TableCell align="center">Pitch 3</TableCell>
               </TableRow>
             </TableHead>
             <TableBody>{this.getLines()}</TableBody>
           </>
         );
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

class Bounceback extends Component{
    render(){
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <DataTable data={this.props.data} />
            </div>
        )
    }
}

export default withStyles(useStyles)(Bounceback);