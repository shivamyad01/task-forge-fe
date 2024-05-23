
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/constant";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [overdueTasks, setOverdueTasks] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const tasksResponse = await axios.get(`${API_BASE_URL}/api/tasks`);
      const overdueResponse = await axios.get(`${API_BASE_URL}/api/tasks/overdue`);

      const taskData = tasksResponse.data;
      const overdueData = overdueResponse.data;

      const completed = taskData.filter((task) => task.status === "completed").length;
      const pending = taskData.filter((task) => task.status === "pending").length;
      const overdue = overdueData.length; // Count of overdue tasks

      // Filter out overdue tasks from pending tasks
      const pendingNotOverdue = taskData.filter((task) => task.status === "pending" && !overdueData.find(overdueTask => overdueTask.id === task.id)).length;

      setTasks(taskData);
      setCompletedTasks(completed);
      setPendingTasks(pendingNotOverdue); // Set pending tasks without overdue ones
      setOverdueTasks(overdue);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddTask = () => {
    navigate("/task");
  };
  const pieData = {
    labels: ["Completed", "In Progress", "Overdue"],
    datasets: [
      {
        data: [completedTasks, pendingTasks, overdueTasks],
        backgroundColor: ["#4CAF50", "#2196F3", "#f44336"],
        hoverBackgroundColor: ["#66bb6a", "#42a5f5", "#ef5350"]
      }
    ]
  };
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14
          },
          color: '#333'
        }
      }
    }
  };
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md ">
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
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          onClick={handleAddTask}
        >
          Add New Task
        </button>
      </div>
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Task Status Distribution</h2>
        <div style={{ width: "100%", height: "400px" }}>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
