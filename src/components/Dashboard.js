import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';

import SideList from'./listItem/SIdeList'
import AuthForm from './Auth/AuthForm';

import { Redirect, Route, Switch } from "react-router-dom";

import Home from "./Home/Home";

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Orders from "./Orders";
import AuthContext from '../store/auth-context';
import { Button } from '@material-ui/core';
import Facility from './facilities/Facility';
import dclasses from './dashboard.module.css'
import AllFacilities from './facilities/ListFacilites/AllFacilities';
import Category from './category/category';
import ListCategory from './category/ListCategory';
import FeedBack from './feedback/FeedBack';
import AddUser from './user/AddUser';
import ListUsers from './user/listUsers';
import AddImage from './facilities/AddImage';
import UpdateFacility from './facilities/UpdateFacility';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
     
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function Dashboard() {

    const ctx = useContext(AuthContext);
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Majesty Dashboard
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>



                    {!ctx.isLoggedIn &&
                        <IconButton color="inherit">
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                            >
                                Login
                            </Button>
                        </IconButton>}




                    {ctx.isLoggedIn &&
                        <IconButton color="inherit">
                            <Badge color="secondary">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={ctx.logout}
                                    className={classes.button}
                                    startIcon={<ExitToAppIcon />}
                                >
                                    Logout
                                </Button>

                            </Badge>
                        </IconButton>
                    }


                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List><SideList /></List>
            </Drawer>



      

            <main className={`${classes.content} ${dclasses.scroll}`}>

                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>


                        <Switch>
                            <Route exact path="/">
                                {ctx.isLoggedIn && <Home />}
                                {!ctx.isLoggedIn && <Redirect to='/auth' />}
                            </Route>


                            <Route path="/orders" >
                                {ctx.isLoggedIn && <Orders />}
                                {!ctx.isLoggedIn && <Redirect to='/auth' />}
                            </Route>

                            
                            <Route path="/adduser" exact >
                                {ctx.isLoggedIn && <AddUser />}
                                {!ctx.isLoggedIn && <Redirect to='/auth' />}
                            </Route>




                            <Route path="/auth" >
                                <AuthForm />
                            </Route>

                            <Route exact path="/facility" >
                            {ctx.isLoggedIn && <Facility />}
                                {!ctx.isLoggedIn && <Redirect to='/auth' />}
                            </Route>
                            <Route exact path="/facility/edit/:id" >
                            {ctx.isLoggedIn && <UpdateFacility />}
                                {!ctx.isLoggedIn && <Redirect to='/auth' />}
                            </Route>
                            <Route exact path="/facility/addimage/:id" >
                            {ctx.isLoggedIn && <AddImage />}
                                {!ctx.isLoggedIn && <Redirect to='/auth' />}
                            </Route>

                            <Route path="/facility/all" >
                            {ctx.isLoggedIn && <AllFacilities />}
                                {!ctx.isLoggedIn && <Redirect to='/auth' />}
                            </Route>
                            <Route path="/users/all" >
                            {ctx.isLoggedIn && <ListUsers/>}
                                {!ctx.isLoggedIn && <Redirect to='/auth' />}
                            </Route>
                            
                            <Route exact path="/category" >
                            {ctx.isLoggedIn && <Category />}
                                {!ctx.isLoggedIn && <Redirect to='/auth' />}
                            </Route>

                            <Route path="/category/all" >
                            {ctx.isLoggedIn && <ListCategory   />}
                                {!ctx.isLoggedIn && <Redirect to='/auth' />}
                            </Route>
                            <Route path="/feedbacks" >
                            {ctx.isLoggedIn && <FeedBack   />}
                                {!ctx.isLoggedIn && <Redirect to='/auth' />}
                            </Route>
                            

                            

                        </Switch>

                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
           
        </div>
         // end of main part where routes are rendered
    );
}