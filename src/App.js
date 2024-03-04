// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MiniDrawer from './Components/MiniDrawer';
import Dashboard from './Components/Dashboard';
import ProfileManager from './Components/ProfileManager';
import TaskManager from './Components/TaskManager';

// Import other components/pages as needed

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MiniDrawer />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/profile" element={<ProfileManager/>} />
        <Route path="/task" element={<TaskManager/>} />        
      </Routes>
    </Router>
  );
};

export default App;
