import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
  const [mode, setMode] = useState(() => {
    // Check if mode is stored in local storage
    const savedMode = localStorage.getItem('mode');
    return savedMode ? savedMode : 'light'; // Default to light mode if not found
  });

  useEffect(() => {
    // Update local storage when mode changes
    localStorage.setItem('mode', mode);
  }, [mode]);

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const theme = mode === 'light' ? lightTheme : darkTheme;

  const ProtectedRoute = ({ element, ...rest }) => {
    return isLoggedIn ? (
      <Route {...rest} element={element} />
    ) : (
      <Navigate to="/login" />
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<MiniDrawer toggleMode={toggleMode} mode={mode} />}>
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/profile" element={<ProtectedRoute element={<ProfileManager />} />} />
            <Route path="/task" element={<ProtectedRoute element={<TaskManager />} />} />
            <Route path="/help" element={<ProtectedRoute element={<Help />} />} />
            <Route path="/setting" element={<ProtectedRoute element={<Settings toggleMode={toggleMode} />} />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
