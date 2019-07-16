import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles, fade } from '@material-ui/core/styles';
import { Grid, Container, Card, Paper } from '@material-ui/core';

const useStyles = theme => ({
    root: {
        overflowX: 'auto',
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
function Cell(props){
    let val = props.value;
    var color_value = 0xFFFFFF
    var sub_color = 0x003333 * val
    var result = color_value = color_value - sub_color;
    var colorHex = "#" +result.toString(16)
    let colorStyle = { backgroundColor: colorHex};
    return(
        <TableCell style={colorStyle}>{props.value}</TableCell>
    );
}

function Line(props) {
    function getCell(value){
        return (
            <Cell value={value}/>
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
        </TableRow>
    );
}

class PitchInfo extends Component{
    // constructor(props){
    //     super(props);   
    
    // }
    getLines() {
        // console.log(this.props);
        let d = [];
        for(let i=0; i < this.props.pitch_data.length; i++){
            d.push(
                <Line value={this.props.pitch_data[i]} key={i} />);
        }
        return d;
    }
    render() {
        const loading = this.props.loading;
        let body = loading ?
            (<div className="has-text-centered">
            </div>) : 
            (
            <Table size="small" padding="checkbox">
                <TableHead>
                    <TableRow>
                        <TableCell>Range</TableCell>
                        <TableCell>HR</TableCell>
                        <TableCell>3B</TableCell>
                        <TableCell>2B</TableCell>
                        <TableCell>1B</TableCell>
                        <TableCell>BB</TableCell>
                        <TableCell>FO</TableCell>
                        <TableCell>K</TableCell>
                        <TableCell>PO</TableCell>
                        <TableCell>LGO</TableCell>
                        <TableCell>RGO</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>            
                    {this.getLines()}
                </TableBody>
            </Table>
            );
        return(
            <div>{body}</div>
        );
    }
}

class PitchMatrix extends Component{
    constructor(props){
        super(props);
        this.state = {
            pitch_data: [],
            loading: true,
        }
        this.getMatrix = this.getMatrix.bind(this);
        this.addData = this.addData.bind(this);
    }
    componentDidMount(){
        // if (this.props.player !== ""){
        this.getMatrix();
        // }
    }
    componentDidUpdate(prevProps) {
        console.log("UPDATE");
        console.log(prevProps);
        console.log(this.props);
        // Typical usage (don't forget to compare props):
        if (this.props.player !== prevProps.player) {
            this.getMatrix();
        }
    }
    getMatrix(){
        this.setState({loading:true, pitch_data:[]});
        if (this.props.player === undefined){
            return;
        }
        let player_name = encodeURIComponent(this.props.player.trim());
        let url = "http://localhost:5000/info/matrix/" + player_name;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((result) => {
            const pitch_data = this.state.pitch_data.slice();
            let new_pitches = [];
            for(let i = 0; i < result.length; i++){
                let res = result[i];
                new_pitches.push(res);
            }
            // console.log(new_pitches);
            this.setState({
                pitch_data: pitch_data.concat(new_pitches),
                loading: false,
            });
        })
        .catch(() => {
            console.log('Request Swallowed!');
        });
    }
    addData(i) {
        const pitch_data = this.state.pitch_data.slice();
        let new_data = []
        new_data.push(i);
        this.setState({
            pitch_data: pitch_data.concat(new_data),
        });
    }
    render(){
        const { classes } = this.props;
        return(
            <div className="Pitch Matrix Root">
                <h3> Pitch Matrix</h3>
                <PitchInfo loading={this.state.loading} pitch_data={this.state.pitch_data}/>
            </div>
        )
    }
}

class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened:false,
            value:"", 
            loading: true,
            player:"",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();
        this.setState({loading: false});
        this.setState({player:this.state.value});
        this.setState({ value:""});
    }
    render(){
        const { classes } = this.props;
        const loading = this.state.loading;
        let body = loading ?
            (<div>
                <Grid item xs={12}>
                    <form onSubmit={this.handleSubmit} className={classes.container} >
                        <TextField className={classes.textField} style={{ margin: 20 }} label="Player Name" id="player-name" type="text" value={this.state.value} onChange={this.handleChange} variant="outlined" margin="normal" InputLabelProps={{shrink: true,}} />
                        <Button variant="contained" className={classes.button} type="submit" size="small">Submit</ Button>
                    </form>
                </Grid>
            </div>) :
            (<div>
                <Grid item xs={12}>
                    <form onSubmit={this.handleSubmit} className={classes.container} >
                        <TextField className={classes.textField} style={{ margin: 20 }} label="Player Name" id="player-name" type="text" value={this.state.value} onChange={this.handleChange} variant="outlined" margin="normal" InputLabelProps={{ shrink: true, }} />
                        <Button variant="contained" className={classes.button} type="submit" size="small">Submit</ Button>
                    </form>
                </Grid>
                <Grid item xs={12}>
                    <Container>
                            <Paper>
                            <PitchMatrix player={this.state.player} />
                        </Paper>
                    </Container>
                </Grid>
            </div>);
        return(
            body
        );
    }
}

export default withStyles(useStyles)(Info);