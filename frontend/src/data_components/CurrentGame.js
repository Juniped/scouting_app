import React, { Component } from "react";
import { 
    Card,
    CardContent,
    Paper,
    Typography,
    Box,
    Grid,
 } from "@material-ui/core";
 import { withStyles} from '@material-ui/core/styles';
 import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    LineChart,
    XAxis,
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Line,
    Area,
    AreaChart,
  } from "recharts";
  import MediaQuery from "react-responsive";
  import ChangeMatrix from "./ChangeMatrix";

 const useStyles = theme => ({
    root: {
        overflowX: 'auto',
        margin: theme.spacing(1),
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(3, 2),
    },
});

class CurrentHistogram extends Component{
    render(){
        return(
            <div style={{ width: "100%", height: 400 }}>
                <MediaQuery minWidth={601}>
                    <ResponsiveContainer width="100%">
                    <AreaChart
                        height={250}
                        data={this.props.data}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="range" />
                        <YAxis />
                        <Tooltip />
                        {/* <Legend /> */}
                        <Area
                        name="Pitches"
                        dataKey="total"
                        stroke="#68c42b"
                        type="step"
                        />
                    </AreaChart>
                    </ResponsiveContainer>
                </MediaQuery>
            </div>
        )
    }
}

class CurrentGame extends Component{
    render(){
        const{ classes } = this.props;
        return (
          <Box className={classes.root}>
            <Paper className={classes.paper}>
              <Typography variant="h3">Current Game Information</Typography>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="body1">
                        Average Jump = {this.props.data.avg_jump}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper}>
                    <Typography variant="h5">Change Matrix</Typography>
                    <ChangeMatrix
                      pitch_data={this.props.data.changeMatrix[0]}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper>
                    <Typography variant="body1">
                      Current Game Range Chart
                    </Typography>
                    <CurrentHistogram data={this.props.data.matrix} />
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        );
    }
}

export default withStyles(useStyles)(CurrentGame);
