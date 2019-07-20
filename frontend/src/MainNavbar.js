import React from "react";
import { loadCSS } from 'fg-loadcss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';
import "./Navbar.css";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles';
import { makeStyles } from "@material-ui/styles";
import { red } from '@material-ui/core/colors';
import MediaQuery from 'react-responsive';
import { Tabs, Tab } from "@material-ui/core";

import { hasRole} from './auth';


const functionStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
  },
  title: {
    flexGrow: 1,
  },
  icon: {
  },
  iconHover: {
    '&:hover': {
      color: red[800],
    },
  },
}));

const useStyles = makeStyles(theme => ({
    root: {flexGrow: 1, },
    title: { flexGrow: 1,},
    avatar: {margin: 10, },
    tab: {
      '&:hover': {
        backgroundColor: fade("#FFFFFF", 0.15),
      },
    },
    tabLink : {
      display:"flex",
      alignItems:"center",
      justifyContent:"center"
    },
    
}));


function BMenu() {
  const classes = functionStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  function handleMenu(event) { setAnchorEl(event.currentTarget); }
  function handleClose() { setAnchorEl(null); }
  React.useEffect(() => {loadCSS('https://use.fontawesome.com/releases/v5.1.0/css/all.css',document.querySelector('#font-awesome-css'), ); }, []);
  return (
        <div className="Burger">
          <IconButton edge="start" className={classes.menuButton} aria-label="Menu" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit" >
            <MenuIcon />
          </IconButton>
      <Menu id="menu-appbar" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }} >
        <Link to="/" style={{ textDecoration: 'none', color: '#000000' }}>
          <MenuItem onClick={handleClose} >Home</MenuItem>
        </Link>
        <Link to="info" style={{ textDecoration: 'none', color: '#000000' }}>
          <MenuItem onClick={handleClose}>Info</MenuItem>
        </Link>
      </Menu>
      </div>
        
  );
}

export default function MainNavbar(props){
  const classes = useStyles();
  const [value, setValue] = React.useState();
  function handleChange(event, newValue) {
    setValue(newValue);
  }
  console.log(props.user)
  // console.log(hasRole(props.user, ['user']));
  return (
    <div className={classes.root}>
      <AppBar style={{backgroundColor: '#0c0c0c'}} position='sticky' >
        <Toolbar>
          {hasRole(props.user, ['user']) &&<MediaQuery maxWidth={600}><BMenu /></MediaQuery>}
          <MediaQuery minWidth={601}>
          <Tabs value={value} onChange={handleChange}>
              {hasRole(props.user, ['user']) &&<Link to="/" style={{ textDecoration: 'none', color: '#FFFFFF' }} className={classes.tab}>
              <Tab label="Home" />
            </Link> }
              {hasRole(props.user, ['user']) &&
            <Link to="info" style={{ textDecoration: 'none', color: '#FFFFFF' }} className={classes.tab}>
              <Tab label="Player Info"/>
            </Link> }
          </Tabs>
          </MediaQuery>
        </Toolbar>
        </AppBar>
    </div>
    
  )
}
