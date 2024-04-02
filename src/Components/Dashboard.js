// Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,Navigate } from 'react-router-dom';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  // const [overdueTasks, setOverdueTasks] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5001/tasks') // Adjust the URL accordingly
      .then(response => {
        const taskData = response.data;
        const completed = taskData.filter(task => task.status === 'completed').length;
        const pending = taskData.filter(task => task.status === 'pending').length;
        // const overdue = taskData.filter(task => task.status === 'overdue').length;

        setTasks(taskData);
        setCompletedTasks(completed);
        setPendingTasks(pending);
        // setOverdueTasks(overdue);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const handleAddTask = () => {
    console.log('Add new task clicked!');
  };

  return (
    <div className="bg-gray-200 p-4 rounded-md">
      <h1 className="text-4xl font-bold mb-4">Task Dashboard</h1>

      <div className="bg-white p-4 rounded-md mb-4">
        <h2 className="text-2xl font-bold mb-2">Task Overview</h2>
        <p>Total Tasks: {tasks.length}</p>
        <p>Completed Tasks: {completedTasks}</p>
        <p>Pending Tasks: {pendingTasks}</p>
        {/* <p>Overdue Tasks: {overdueTasks}</p> */}
      </div>

      <div className="bg-white p-4 rounded-md mb-4">
        <h2 className="text-2xl font-bold mb-2">Quick Stats</h2>
        {/* Add visual representations of stats if needed */}
      </div>

      <div className="bg-white p-4 rounded-md">
        <h2 className="text-2xl font-bold mb-2">Actions</h2>
        <Link to="/task" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Add New Task
        </Link>
      
      </div>
    </div>
  );
};

export default Dashboard;
