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
import RequireAuth from './routes/RequireAuth';
import { AuthProvider } from './context/AuthContext';

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

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<RequireAuth />}>
              <Route path="/" element={<MiniDrawer toggleMode={toggleMode} mode={mode} />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile" element={<ProfileManager />} />
                <Route path="task" element={<TaskManager />} />
                <Route path="help" element={<Help />} />
                <Route path="setting" element={<Settings toggleMode={toggleMode} />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
