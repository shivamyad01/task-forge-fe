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
import Setting from "./Components/Setting";
import Help from "./Components/Help";
import Settings from "./Components/Setting"; // Import Settings component
import { API_BASE_URL } from "./utils/constant";


const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is logged in by calling a backend route
    axios
      .get(`${API_BASE_URL}/api/users/login`)
      .then((response) => {
        if (response.data.loggedIn) {
          setLoggedIn(true);
        }
        setLoading(false); // Set loading to false after request completes
      })
      .catch((error) => {
        console.error("Error checking login status:", error);
        setLoading(false); // Set loading to false if there's an error
      });
  }, []); // Empty dependency array to run the effect only once
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/register" element={<Register />} />

        {isLoggedIn ? (
          <Route path="/" element={<MiniDrawer />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfileManager />} />
            <Route path="/task" element={<TaskManager />} />
            <Route path="/help" element={<Help />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/settings" element={<Settings />} /> {/* Include Settings component route */}
            {/* Add more routes as needed */}
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;