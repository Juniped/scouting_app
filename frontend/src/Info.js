import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Container, Card, Paper } from '@material-ui/core';

import RawData from './data_components/RawData';
import LastSix from './data_components/LastSix';
import PitchMatrix from './data_components/PitchMatrix';
import FirstInning from './data_components/FirstInning';

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
    card: {
        backgroundColor: "#FFFFFF",
    },
});
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
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <form onSubmit={this.handleSubmit} className={classes.container} >
                            <TextField className={classes.textField} style={{ margin: 20 }} label="Player Name" id="player-name" type="text" value={this.state.value} onChange={this.handleChange} variant="outlined" margin="normal" InputLabelProps={{ shrink: true, }} />
                            <Button variant="contained" className={classes.button} type="submit" size="small">Submit</ Button>
                        </form>
                    </Grid>
                    <Grid item xs={12}>
                        <Container>
                                <Paper>
                                <PitchMatrix player={this.state.player} api_url={this.props.api_url} />
                            </Paper>
                        </Container>
                    </Grid>
                    <br/>
                    <Grid item xs={12} sm={6} md={3}>
                        <Container className={classes.container}>
                            <Card className={classes.card}>
                                <LastSix player={this.state.player} api_url={this.props.api_url} />
                            </Card>
                        </Container>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Container className={classes.container}>
                            <Card className={classes.card}>
                                <FirstInning player={this.state.player} api_url={this.props.api_url} />
                            </Card>
                        </Container>
                    </Grid>
                    <Grid item xs={12} >
                        <hr />
                        <Container className={classes.container}>
                            <RawData player={this.state.player} api_url={this.props.api_url} />
                        </Container>
                    </Grid>
                </Grid>
            </div>);
        return(
            body
        );
    }
}

export default withStyles(useStyles)(Info);