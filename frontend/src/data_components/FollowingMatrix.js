import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import MediaQuery from "react-responsive";
import { withStyles } from "@material-ui/core/styles";

const useStyles = theme => ({
  root: {
    overflowX: "auto",
    margin: theme.spacing(1)
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    backgroundColor: "#fb4f14"
  },
  paper: {
    padding: theme.spacing(3, 2)
  },
  table: {
    minWidth: 550
  },
  tableSmall: {
    padding: theme.spacing(1)
  }
});
function Cell(props) {
  let val = props.value;
  var color_value = 0xeeeeee;
  var sub_color = 0x111111 * val;
  var result = (color_value = color_value - sub_color);
  var colorHex = "#" + result.toString(16);
  let colorStyle = { backgroundColor: colorHex };
  return (
    <TableCell align="center" style={colorStyle}>
      {props.value}
    </TableCell>
  );
}

function Line(props) {
  function getCell(value) {
    return <Cell value={value} />;
  }
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {props.value.range}
      </TableCell>
        {getCell(props.value.following[0].count)}
        {getCell(props.value.following[1].count)}
        {getCell(props.value.following[2].count)}
        {getCell(props.value.following[3].count)}
        {getCell(props.value.following[4].count)}
        {getCell(props.value.following[5].count)}
        {getCell(props.value.following[6].count)}
        {getCell(props.value.following[7].count)}
        {getCell(props.value.following[8].count)}
        {getCell(props.value.following[9].count)}
    </TableRow>
  );
}

class FollowingMatrix extends Component {
  getLines() {
    
    let d = [];
    for (let i = 0; i < this.props.pitch_data.length; i++) {
      d.push(<Line value={this.props.pitch_data[i]} key={i} />);
    }
    return d;
  }
  render() {
    const { classes } = this.props;
    let body = (
      <>
        <TableHead>
          <TableRow>
            <TableCell align="center">Range</TableCell>
            <TableCell align="center">1-100</TableCell>
            <TableCell align="center">101-200</TableCell>
            <TableCell align="center">201-300</TableCell>
            <TableCell align="center">301-400</TableCell>
            <TableCell align="center">401-500</TableCell>
            <TableCell align="center">501-600</TableCell>
            <TableCell align="center">601-700</TableCell>
            <TableCell align="center">701-800</TableCell>
            <TableCell align="center">801-900</TableCell>
            <TableCell align="center">901-1000</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{this.getLines()}</TableBody>
      </>
    );
    return (
      <div className={classes.root}>
        <MediaQuery minWidth={1346}>
          <Table size="small" padding="checkbox">
            {body}
          </Table>
        </MediaQuery>
        <MediaQuery maxWidth={1345}>
          <Table size="small" padding="none" style={{ width: "100%" }}>
            {body}
          </Table>
        </MediaQuery>
      </div>
    );
  }
}

export default withStyles(useStyles)(FollowingMatrix);
