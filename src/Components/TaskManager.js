import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskManager = () => {
  const [profiles, setProfiles] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    profileId: "",
    name: "",
    description: "",
    deadline: "",
    status: "pending",
  });
  const [filterCriteria, setFilterCriteria] = useState("all");

  useEffect(() => {
    fetchProfiles();
    fetchTasks();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get("http://localhost:5001/profiles");
      setProfiles(response.data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5001/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = async () => {
    try {
      await axios.post("http://localhost:5001/tasks", newTask);
      fetchTasks();
      setNewTask({
        profileId: "",
        name: "",
        description: "",
        deadline: "",
        status: "pending",
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.put(`http://localhost:5001/tasks/${taskId}`, {
        status: newStatus,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleRemoveTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5001/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error("Error removing task:", error);
    }
  };

  const handleFilterChange = (e) => {
    setFilterCriteria(e.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterCriteria === "all") {
      return true;
    } else {
      return task.status === filterCriteria;
    }
  });

  return (
    <div className="task-manager-container p-4">
      <h1 className="font-poppins">Task Manager</h1>

      <div className="mb-4 border-2 rounded-2xl mt-3">
        <h2 className="subheading-text mb-3 mt-2 ml-4">Add Task</h2>
        <form>
          <div
            className="
        grid grid-cols-3 gap-4"
          >
            <div className="mb-2">
              <label>
                <div className="">
                  <select
                    className="outline-2 outline-blue-500/50 border rounded-md w-96 p-2 font-thin bg-color mb-2 ml-10 flex items-center h-12"
                    name="profileId"
                    value={newTask.profileId}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      Select Employee
                    </option>
                    {profiles.map((profile) => (
                      <option key={profile.id} value={profile.id}>
                        {profile.name}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-thin mb-1">
                <input
                  className="outline-2 outline-blue-500/50 border rounded-md w-96 p-2 font-thin bg-color mb-2 ml-14 flex items-center h-12"
                  type="date"
                  name="deadline"
                  value={newTask.deadline}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>{/* Empty Div */}</div>
            <div className="">
              <label className="block text-sm font-semibold mb-1">
                <input
                  className="outline-2 outline-blue-500/50 border rounded-md w-96 p-2 font-thin mb-2 ml-10 flex items-center h-12 bg-color "
                  type="text"
                  name="name"
                  value={newTask.name}
                  placeholder="Task Name"
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="mb-2">
              <label className="">
                <textarea
                  className="outline-2 outline-blue-500/50 border rounded-md w-96 p-2 font-thin bg-color mb-2 flex  ml-14 items-center h-12"
                  name="description"
                  value={newTask.description}
                  placeholder="Description"
                  onChange={handleInputChange}
                ></textarea>
              </label>
            </div>
            <div className="">
              <button
                type="button"
                className=" btn-font-color bg-green-200 btn-background-color  py-2 ml-60 rounded hover:bg-green-400 w-32  "
                onClick={handleAddTask}
              >
                Add Task
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Filter Tasks</h2>
        <select
          className="border rounded p-2"
          value={filterCriteria}
          onChange={handleFilterChange}
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending Tasks</option>
          <option value="completed">Completed Tasks</option>
        </select>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-2">Task List</h2>
        <ul>
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="border p-2 mb-2 flex justify-between items-center"
            >
              <div>
                <p style={{ fontWeight: "bold" }}>
                  Profile: {task.profile_name}
                </p>
                <h2 style={{ fontSize: "1.2rem", marginTop: "10px" }}>
                  Task: {task.name}
                </h2>
                <p style={{ marginTop: "5px" }}>
                  Description: {task.description}
                </p>
                <p style={{ marginTop: "5px" }}>
                  Deadline: {new Date(task.deadline).toLocaleDateString()}
                </p>
                <p
                  style={{
                    marginTop: "5px",
                    color: task.status === "completed" ? "green" : "red",
                  }}
                >
                  Status: {task.status}
                </p>
              </div>

              <div>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  onClick={() => handleUpdateTaskStatus(task.id, "completed")}
                >
                  Complete
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleUpdateTaskStatus(task.id, "pending")}
                >
                  Mark Pending
                </button>
                <button
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                  onClick={() => handleRemoveTask(task.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskManager;
