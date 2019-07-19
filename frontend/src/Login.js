import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core";

const logStyles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    button: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        backgroundColor: "#fb4f14",
    },
  });

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username:"",
            password:"",
        }
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangepassword = this.handleChangepassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkLogin = this.props.checkLogin.bind(this);
  
    }
    
    handleChangeUsername(event) {
        this.setState({username: event.target.value});
    }
    handleChangepassword(event) {
        this.setState({password: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();
        var username = this.state.username;
        var password = this.state.password;
        this.checkLogin(username, password);
    }
    render(){
        const { classes } = this.props;
        return(
        <div>
             <form onSubmit={this.handleSubmit} className={classes.container} >
                <TextField autoFocus className={classes.textField} style={{ margin: 20 }} label="username" id="username" type="text" value={this.state.username} onChange={this.handleChangeUsername} variant="outlined" margin="normal" InputLabelProps={{shrink: true,}} />
                <TextField className={classes.textField} style={{ margin: 20 }} label="username" id="password" type="text" value={this.state.password} onChange={this.handleChangepassword} variant="outlined" margin="normal" InputLabelProps={{shrink: true,}} />
                <Button variant="contained" className={classes.button} type="submit" size="small" color="primary">Login</ Button>
            </form>
        </div>
        )
    }
  }

export default withStyles(logStyles)(Login);