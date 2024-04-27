// App.js

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "axios";

import MiniDrawer from "./Components/MiniDrawer";
import Dashboard from "./Components/Dashboard";
import ProfileManager from "./Components/ProfileManager";
import TaskManager from "./Components/TaskManager";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Setting from "./Components/Setting";
import Help from "./Components/Help";
// Import Settings component

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

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
    <Router>
      <Routes>
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/register" element={<Register />} />

        {isLoggedIn ? (
          <Route path="/" element={<MiniDrawer />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfileManager />} />
            <Route path="/task" element={<TaskManager />} />
            <Route path="/help" element={<Help />} />{" "}
            <Route path="/setting" element={<Setting />} />
            {/* Include Settings component route */}
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
