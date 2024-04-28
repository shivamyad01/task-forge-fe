import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Perform logout logic
    // For simplicity, just navigate to the login page
    navigate("/login");
  };

  return (
    <React.Fragment>
      <Tooltip >
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }}>

            
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 4, // Add elevation for a shadow effect
          sx: {
            width: "200px", // Adjust menu width
            borderRadius: "8px", // Add border radius
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          component={Link}
          to="/profile"
          sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" } }}
        >
          <ListItemIcon></ListItemIcon>
          <Typography variant="body1">
            <b id="profile" className="font-poppins text-xl ml-4">
              Profile
            </b>
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleLogout}
          sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" } }}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <Typography variant="body1">
            <b className="inner-text text-sm font-extralight">New account</b>
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" } }}
        >
          <ListItemIcon>
            <PersonAddIcon />
          </ListItemIcon>
          <Typography variant="body1">
            <b className="inner-text text-sm font-extralight">Add account</b>
          </Typography>
        </MenuItem>
        <MenuItem
          sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" } }}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <Typography variant="body1">
            <b className="inner-text text-sm font-extralight">Settings</b>
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" } }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <Typography variant="body1">
            <b className="inner-text text-sm font-extralight">Logout</b>
          </Typography>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
