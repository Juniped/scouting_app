import React from "react";
// import clsx from 'clsx';
import { loadCSS } from 'fg-loadcss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
// import Icon from '@material-ui/core/Icon'
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';
import "./Navbar.css";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import { fade } from '@material-ui/core/styles';
import { makeStyles } from "@material-ui/styles";
// import panda from './panda.png';
import { red } from '@material-ui/core/colors';
// import Responsive from 'react-responsive';
import MediaQuery from 'react-responsive';
import { Tabs, Tab } from "@material-ui/core";

const functionStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    // marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  icon: {
    // margin: theme.spacing(2),
  },
  iconHover: {
    // margin: theme.spacing(2),
    '&:hover': {
      color: red[800],
    },
  },
}));

const useStyles = makeStyles(theme => ({
    root: {flexGrow: 1, },
    // menuButton: { marginRight: theme.spacing(1),},
    title: { flexGrow: 1,},
    // icon: {margin: theme.spacing(2),color: "#DF4601",},
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
  // const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // function handleChange(event) { setAuth(event.target.checked); }
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
        {/* <MenuItem>
          <a href="https://github.com/Juniped/scouting_app">
            <Icon className={clsx(classes.icon, 'fab fa-github')} style={{ color: '#000000' }} />
          </a>
        </MenuItem> */}
      </Menu>
      </div>
        
  );
}

// function NavTabs() {
//   const classes = tabStyles();
//   // var value = 0
//   // function setValue(newValue){
//   //   value = newValue;
//   // }
//   const [value, setValue] = React.useState(0);

//   function handleChange(event, newValue) {
//     console.log(newValue);
//     setValue(newValue);
//   }
//   return (
//     <Tabs value={value} onChange={handleChange}>
//       <NavLink to="/" style={{ textDecoration: 'none', color: '#FFFFFF' }} className={classes.tab}><Tab label="Home" /> </ NavLink>
//       <NavLink to="info" style={{ textDecoration: 'none', color: '#FFFFFF' }} className={classes.tab}><Tab label="Player Info" /></NavLink>
//     </Tabs>
//   );

// }

// class MainNavbar extends Component{
//   constructor(props){
//     super(props);
//     this.value = 0;
//   }
//   auth() {
//     React.useState(true);
//   }
//   render(){
//     const { classes } = this.props;
//     return (
        // <div className={classes.root}>
        //   <AppBar style={{backgroundColor: '#080808'}} position='sticky' >
        //     <Toolbar>
        //       <MediaQuery maxWidth={600}><BMenu /></MediaQuery>
        //       <MediaQuery minWidth={601}>
        //         <NavTabs />
        //       </MediaQuery>
        //     </Toolbar>
        //     </AppBar>
            
        // </div>
//     );
//   }
// }

export default function MainNavbar(){
  const classes = useStyles();
  const [value, setValue] = React.useState();
  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar style={{backgroundColor: '#080808'}} position='sticky' >
        <Toolbar>
          <MediaQuery maxWidth={600}><BMenu /></MediaQuery>
          <MediaQuery minWidth={601}>
          <Tabs value={value} onChange={handleChange}>
            <Link to="/" style={{ textDecoration: 'none', color: '#FFFFFF' }} className={classes.tab}>
              <Tab label="Home" />
            </Link>
            <Link to="info" style={{ textDecoration: 'none', color: '#FFFFFF' }} className={classes.tab}>
              <Tab label="Player Info"/>
            </Link>
          </Tabs>
          </MediaQuery>
        </Toolbar>
        </AppBar>
    </div>
    
  )


}

// export default withStyles(useStyles)(MainNavbar);