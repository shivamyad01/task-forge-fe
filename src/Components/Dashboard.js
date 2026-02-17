
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks, getOverdueTasks } from "../api/taskService";
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
      const taskData = await getTasks();
      const overdueData = await getOverdueTasks();

      const completed = taskData.filter((task) => task.status === "completed").length;
      // const pending = taskData.filter((task) => task.status === "pending").length;
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
  
  const todoTasks = tasks
    .filter((task) => task.status === "pending")
    .slice(0, 5);

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
    <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-4">Task Dashboard</h1>
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
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm sm:text-base"
          onClick={handleAddTask}
        >
          Add New Task
        </button>
      </div>
      <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Task Status Distribution</h2>
          <div className="w-full h-64 sm:h-80 md:h-96">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col">
          <h2 className="text-xl font-semibold mb-2">To-Do List</h2>
          <p className="text-sm text-gray-500 mb-4">
            Showing up to 5 pending tasks
          </p>
          {todoTasks.length === 0 ? (
            <p className="text-gray-600 text-sm">You're all caught up. No pending tasks!</p>
          ) : (
            <ul className="space-y-3 max-h-72 overflow-y-auto">
              {todoTasks.map((task) => (
                <li
                  key={task.id}
                  className="border rounded-lg p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                >
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base truncate max-w-xs">
                      {task.name}
                    </h3>
                    {task.deadline && (
                      <p className="text-xs text-gray-500 mt-1">
                        Due: {new Date(task.deadline).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <span className="inline-flex items-center self-start sm:self-auto px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
