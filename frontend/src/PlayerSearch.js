import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
})

class PlayerSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        // Make Call to Lemon API
    }
    render() {
        const { classes } = this.props;
        return (
            <form onSubmit={this.handleSubmit} className={classes.container} >
                <TextField
                    className={classes.textField}
                    style={{ margin: 20 }}
                    label="Player Name"
                    id="player-name"
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                    variant="outlined"
                    margin="normal"
                />
                <Button variant="contained" className={classes.button} color="primary">
                    Submit
                </ Button>
            </ form>
        );
    }
}

export default withStyles(styles)(PlayerSearch)