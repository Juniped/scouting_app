import React from "react";
import clsx from 'clsx';
import { loadCSS } from 'fg-loadcss';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon'
import MenuIcon from '@material-ui/icons/Menu';
import {NavLink} from 'react-router-dom';
import {Link} from 'react-router-dom';
import "./Navbar.css";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    icon: {
      margin: theme.spacing(2),
      color: "#DF4601",
    },
  }));


function MainNavbar(){
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    function handleChange(event) {
      setAuth(event.target.checked);
    }

    function handleMenu(event) {
      setAnchorEl(event.currentTarget);
    }

    function handleClose() {
      setAnchorEl(null);
    }
    React.useEffect(() => {
      loadCSS(
        'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
        document.querySelector('#font-awesome-css'),
      );
    }, []);
    // const burgerActive = this.state.burgerActive;
    return (
        <div className={classes.root}>
            <AppBar
                style={{backgroundColor: '#080808'}}
                position='sticky'
            >
            <Toolbar>
                {auth && (
                  <div>
                    <IconButton
                      edge="start"
                      className={classes.menuButton}
                      aria-label="Menu"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                    <MenuIcon />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={open}
                      onClose={handleClose}
                    >
                      <NavLink exact to="/" style={{textDecoration:'none', color:'#000000'}}>
                      <MenuItem onClick={handleClose} exact to="/">Home</MenuItem>
                      </NavLink>
                      <NavLink to="info" style={{textDecoration:'none', color:'#000000'}}>
                        <MenuItem onClick={handleClose}>Info</MenuItem>
                      </NavLink>
                      {/* <Link href="https://github.com/Juniped/scouting_app" style={{textDecoration:'none', color:'#000000'}}> */}
                        <MenuItem>
                          <a href="https://github.com/Juniped/scouting_app">
                          <Icon className={clsx(classes.icon,'fab fa-github')} style={{color:'#000000'}}/>
                          </a>
                        </MenuItem>
                      {/* </Link> */}
                    </Menu>
                  </div>
                )}
                <Typography variant="h6" className={classes.title}>
                    Scouting Application
                </Typography>
                <Icon className={clsx(classes.icon,'fas fa-chart-line fa-2x')} />
            </Toolbar>

            </AppBar>
        </div>
    );
}

export default MainNavbar;