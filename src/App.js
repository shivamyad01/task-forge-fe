// App.js

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import MiniDrawer from "./Components/MiniDrawer";
import Dashboard from "./Components/Dashboard";
import ProfileManager from "./Components/ProfileManager";
import TaskManager from "./Components/TaskManager";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Help from "./Components/Help";
import Settings from "./Components/Setting"; // Import Settings component
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#64B5F6', // Change primary color to a shade of blue
    },
    background: {
      default: '#121212', // Change default background color to a darker shade
      paper: '#1E1E1E', // Change paper background color to a slightly lighter shade
    },
    text: {
      primary: '#0062ff', // Change primary text color to white
      secondary: '#CCCCCC', // Change secondary text color to a light gray
    },
    // You can define more colors as needed
  },
});


const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const theme = mode === 'light' ? lightTheme : darkTheme;


  useEffect(() => {
    // Check if the user is logged in by calling a backend route
    axios
      .get("http://localhost:5001/checkLogin")
      .then((response) => {
        if (response.data.loggedIn) {
          setLoggedIn(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error checking login status:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {isLoggedIn ? (
            <Route path="/" element={<MiniDrawer toggleMode={toggleMode} mode={mode} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<ProfileManager />} />
              <Route path="/task" element={<TaskManager />} />
              <Route path="/help" element={<Help />} />
              <Route path="/setting" element={<Settings toggleMode={toggleMode} />} />

            </Route>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
     
    </ThemeProvider>
  );
};

export default App;
