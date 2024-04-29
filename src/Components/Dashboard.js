// Dashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [overdueTasks, setOverdueTasks] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5001/tasks") // Adjust the URL accordingly
      .then((response) => {
        const taskData = response.data;
        const completed = taskData.filter((task) => task.status === "completed").length;
        const pending = taskData.filter((task) => task.status === "pending").length;
        const overdue = taskData.filter((task) => task.status === "overdue").length;

        setTasks(taskData);
        setCompletedTasks(completed);
        setPendingTasks(pending);
        setOverdueTasks(overdue);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const handleAddTask = () => {
    navigate("/task");
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Task Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold">Total Tasks</p>
            <p>{tasks.length}</p>
          </div>
          <i className="far fa-check-circle text-green-500 text-2xl"></i>
        </div>
        <div className="bg-white rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold">Completed</p>
            <p>{completedTasks}</p>
          </div>
          <i className="far fa-check-circle text-green-500 text-2xl"></i>
        </div>
        <div className="bg-white rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold">In Progress</p>
            <p>{pendingTasks}</p>
          </div>
          <i className="far fa-spinner text-blue-500 text-2xl"></i>
        </div>
        <div className="bg-white rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold">Overdue</p>
            <p>{overdueTasks}</p>
          </div>
          <i className="far fa-clock text-red-500 text-2xl"></i>
        </div>
      </div>
      <div className="mt-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleAddTask}
        >
          Add New Task
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
