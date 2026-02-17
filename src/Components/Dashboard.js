
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks, getOverdueTasks } from "../api/taskService";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import PlaylistAddCheckRoundedIcon from '@mui/icons-material/PlaylistAddCheckRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
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
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-4 text-slate-800">Task Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm border border-gray-100">
          <div>
            <p className="font-semibold">Total Tasks</p>
            <p>{tasks.length}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <AssignmentTurnedInRoundedIcon fontSize="small" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm border border-gray-100">
          <div>
            <p className="font-semibold">Completed</p>
            <p>{completedTasks}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <DoneAllRoundedIcon fontSize="small" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm border border-gray-100">
          <div>
            <p className="font-semibold">In Progress</p>
            <p>{pendingTasks}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <PendingActionsRoundedIcon fontSize="small" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm border border-gray-100">
          <div>
            <p className="font-semibold">Overdue</p>
            <p>{overdueTasks}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <WarningAmberRoundedIcon fontSize="small" />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm sm:text-base shadow-sm"
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
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                <PlaylistAddCheckRoundedIcon fontSize="small" />
              </div>
              <h2 className="text-xl font-semibold text-slate-800">To-Do List</h2>
            </div>
            <span className="text-xs text-gray-400">{todoTasks.length} pending</span>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Showing up to 5 pending tasks
          </p>
          {todoTasks.length === 0 ? (
            <div className="flex items-center gap-2 text-gray-600 text-sm bg-slate-50 border border-dashed border-slate-200 rounded-lg px-3 py-2">
              <RadioButtonUncheckedRoundedIcon fontSize="small" className="text-gray-400" />
              <span>You're all caught up. No pending tasks!</span>
            </div>
          ) : (
            <ul className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {todoTasks.map((task) => (
                <li
                  key={task.id}
                  className="border border-slate-100 rounded-xl p-3 flex items-start justify-between gap-3 bg-slate-50/70"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-orange-500">
                      <RadioButtonUncheckedRoundedIcon fontSize="small" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base text-slate-800 truncate max-w-xs">
                        {task.name}
                      </h3>
                      {task.deadline && (
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <AccessTimeRoundedIcon fontSize="inherit" />
                          <span>Due: {new Date(task.deadline).toLocaleDateString()}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="inline-flex items-center self-start px-2.5 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};
export default Dashboard;
