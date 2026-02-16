import React, { useState } from "react";
import { Link as RouterLink, Outlet } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import TaskIcon from "@mui/icons-material/Task";
import AccountMenu from "./AccountMenu";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import logo from "../Components/assets/logo.png"


import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const drawerWidthOpen = 240; // Width of the drawer when it's open
const drawerWidthClosed = 90; // Width of the drawer when it's closed

const openedMixin = (theme) => ({
  width: drawerWidthOpen,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: drawerWidthClosed, // Set the width to drawerWidthClosed when the drawer is closed
  [theme.breakpoints.up("sm")]: {
    width: drawerWidthClosed, // Adjust width for breakpoints if needed
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin", "background-color"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "gray", // Change the background color here
  ...(open && {
    marginLeft: drawerWidthOpen,
    width: `calc(100% - ${drawerWidthOpen}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: open ? drawerWidthOpen : drawerWidthClosed, // Set the width based on whether the drawer is open or closed
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
export default function MiniDrawer({  mode, toggleMode }) {
  const theme = useTheme();
  const [open, setOpen] = useState(true); // Keep the drawer open by default

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
    <CssBaseline />
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        {/* Logo and title hidden when drawer is open */}
        {!open && (
          <>
            <img src={logo} alt="Logo" style={{ marginRight: '10px', height: '40px' }} />
         
          </>
        )}
          
          <div style={{ display: "flex", marginLeft: "auto" }}>
  <List>
    <ListItem button onClick={toggleMode}>
      <ListItemIcon>
        {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
      </ListItemIcon>
      <ListItemText primary={mode === 'light' ? 'Dark Mode' : 'Light Mode'} />
    </ListItem>
    {/* Add other list items for navigation here */}
  </List>
  <div className="mt-3" >
    <AccountMenu />
  </div>
</div>

      </Toolbar>
    </AppBar>
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        {/* Logo and title shown when drawer is closed */}
        <img src={logo} alt="Logo" style={{  height: '40px' }} />
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      
      </DrawerHeader>
  
        <Divider />
        <List>
          <ListItem component={RouterLink} to="/dashboard">
            <ListItemButton sx={{ "&:hover": { backgroundColor: "orange" } }}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem component={RouterLink} to="/profile">
            <ListItemButton sx={{ "&:hover": { backgroundColor: "orange" } }}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem component={RouterLink} to="/task">
            <ListItemButton sx={{ "&:hover": { backgroundColor: "orange" } }}>
              <ListItemIcon>
                <TaskIcon />
              </ListItemIcon>
              <ListItemText primary="Task" />
            </ListItemButton>
          </ListItem>
          <ListItem component={RouterLink} to="/help">
            <ListItemButton sx={{ "&:hover": { backgroundColor: "orange" } }}>
              <ListItemIcon>
                <HelpCenterIcon />
              </ListItemIcon>
              <ListItemText primary="Help" />
            </ListItemButton>
          </ListItem>
          <ListItem component={RouterLink} to="/setting">
            <ListItemButton sx={{ "&:hover": { backgroundColor: "orange" } }}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Setting" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        {/* Add additional items or footer items here */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Adjusted paddingTop to accommodate AppBar */}
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}






