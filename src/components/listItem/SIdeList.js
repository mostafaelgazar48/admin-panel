import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddIcon from '@material-ui/icons/Add';
import ViewListIcon from '@material-ui/icons/ViewList';
import CategoryIcon from '@material-ui/icons/Category';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import BusinessIcon from '@material-ui/icons/Business';
import HomeIcon from '@material-ui/icons/Home';
import FeedbackIcon from '@material-ui/icons/Feedback';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom'
import { Collapse, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const SideList = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [openUser, setOpenUser] = useState(true);

  const [openCat, setOpenCat] = useState(true);


  const handleClick = () => {
    setOpen(!open);
  };


  const handleCategoryClick = () => {
    setOpenCat(!openCat);
  };
  const handleUserClick = () => {
    setOpenUser(!openUser);
  };
  return (
    <div>
      <ListItem button component={Link} to="/"  >
        <ListItemIcon>
          <HomeIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>


      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <BusinessIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Facility" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {/* Collapsable item */}
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} component={Link} to='/facility'>
            <ListItemIcon>
              <AddIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add Facility" />
          </ListItem>

          {/*  */}

          <ListItem button className={classes.nested} component={Link} to='/facility/all'>
            <ListItemIcon>
              <ViewListIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="All Facilities" />
          </ListItem>
        </List>
      </Collapse>



      <ListItem button onClick={handleCategoryClick}>
        <ListItemIcon>
          <CategoryIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Category" />
        {openCat ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openCat} timeout="auto" unmountOnExit>
        {/* Collapsable

        <ListItem button component={Link} to='/orders' >
            <ListItemIcon>
                <ShoppingCartIcon  color="primary"/>
            </ListItemIcon>
            <ListItemText primary="Orders" />
        </ListItem>

 item */}
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} component={Link} to='/category'>
            <ListItemIcon>
              <AddIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add Category" />
          </ListItem>

          {/*  */}

          <ListItem button className={classes.nested} component={Link} to='/category/all'>
            <ListItemIcon>
              <ViewListIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="All Categories" />
          </ListItem>
        </List>
      </Collapse>


      <ListItem button onClick={handleUserClick}>
        <ListItemIcon>
          <PeopleAltIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Users" />
        {openUser ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openUser} timeout="auto" unmountOnExit>
    
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} component={Link} to='/adduser'>
            <ListItemIcon>
              <AddIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add User" />
          </ListItem>

          {/*  */}

          <ListItem button className={classes.nested} component={Link} to='/users/all'>
            <ListItemIcon>
              <ViewListIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="All Users" />
          </ListItem>
        </List>
      </Collapse>





      <ListItem button component={Link} to='/feedbacks'>
        <ListItemIcon>
          <FeedbackIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Feedbacks" />
      </ListItem>




      <ListItem button component={Link} to='/orders' >
        <ListItemIcon>
          <ShoppingCartIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItem>






    </div>
  )
}
export default SideList