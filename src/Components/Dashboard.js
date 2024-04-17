// Dashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [overdueTasks, setOverdueTasks] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5001/tasks") // Adjust the URL accordingly
      .then((response) => {
        const taskData = response.data;
        const completed = taskData.filter(
          (task) => task.status === "completed"
        ).length;
        const pending = taskData.filter(
          (task) => task.status === "pending"
        ).length;
        const overdue = taskData.filter(
          (task) => task.status === "overdue"
        ).length;

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
    console.log("Add new task clicked!");
  };

  return (
    <div className="bg-color p-4 rounded-2xl ">
      <h1 className="font-poppins">Task Dashboard</h1>
      <br />
      <div className="bg-white p-4 rounded-2xl mb-4">
        <h2 className="text-2xl font-bold mb-2 font-normal">Task Overview</h2>
        <br />
        <div className=" mb-1.5 flex flex-wrap ">
          <div className=" outline-2 outline-blue-500/50 border rounded-md w-60 p-2 font-semibold bg-color mb-2 ml-5  mr-12 flex items-center h-12">
            <p className="inner-text">Total Tasks : {tasks.length}</p>

            <div className="ml-20">
              <i class="fa-regular fa-pen-to-square fa-beat-fade"></i>
            </div>
          </div>
          <div className="outline-2 outline-blue-500/50 border rounded-md w-60 p-2 font-semibold bg-color mb-2 mr-12 flex items-center h-12">
            <p className="inner-text">Completed : {completedTasks}</p>
            <div className="ml-20">
              <i class="fa-regular fa-pen-to-square fa-beat-fade"></i>
            </div>
          </div>
          <div className="outline-2 outline-blue-500/50 border rounded-md w-60 p-2 font-semibold bg-color mr-12 flex items-center h-12">
            <p className="inner-text">In Progress: {pendingTasks}</p>
            <div className="ml-20">
              <i class="fa-regular fa-pen-to-square fa-beat-fade"></i>
            </div>
          </div>
          <div className="outline-2 outline-blue-500/50 border rounded-md w-59 p-2 font-semibold bg-color mr-12 flex items-center h-12">
            <p className="inner-text">Overdue : {overdueTasks}</p>
            <div className="ml-20">
              <i class="fa-regular fa-pen-to-square fa-beat-fade"></i>
            </div>
          </div>
        </div>
        <br />
        <div class="">
          <button className="btn-background-color  border-green-600 btn-font-color px-4 py-2 rounded hover:bg-green-400 w-50 ml-5 ">
            Add new task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
