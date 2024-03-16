
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskManager = () => {
  // State for profiles
  const [profiles, setProfiles] = useState([]);
  // State for tasks
  const [tasks, setTasks] = useState([]);
  // State for new task
  const [newTask, setNewTask] = useState({
    profileId: '',
    name: '',
    description: '',
    deadline: '',
    status: 'pending',
  });

  // Fetch profiles from backend when component mounts
  useEffect(() => {
    fetchProfiles();
    fetchTasks();
  }, []);

  // Function to fetch profiles from backend
  const fetchProfiles = async () => {
    try {
      const response = await axios.get('http://localhost:5001/profiles');
      setProfiles(response.data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  // Function to fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5001/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Function to handle input change in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  // Function to handle task submission
  const handleAddTask = async () => {
    try {
      // Send POST request to backend to add task
      await axios.post('http://localhost:5001/tasks', newTask);
      // Fetch updated task list
      fetchTasks();
      // Reset form fields
      setNewTask({
        profileId: '',
        name: '',
        description: '',
        deadline: '',
        status: 'pending',
      });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Function to handle task status update
  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      // Send PUT request to backend to update task status
      await axios.put(`http://localhost:5001/tasks/${taskId}`, { status: newStatus });
      // Fetch updated task list
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  // Function to handle task removal
  const handleRemoveTask = async (taskId) => {
    try {
      // Send DELETE request to backend to remove task
      await axios.delete(`http://localhost:5001/tasks/${taskId}`);
      // Fetch updated task list
      fetchTasks();
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  // JSX code for rendering the component
  return (
    <div className="task-manager-container p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Add Task</h2>
        <form>
          <div className="mb-2">
            <label className="block text-sm font-semibold mb-1">
              Profile:
              <select
                className="border rounded p-2 w-full"
                name="profileId"
                value={newTask.profileId}
                onChange={handleInputChange}
              >
                <option value="" disabled>Select Profile</option>
                {profiles.map(profile => (
                  <option key={profile.id} value={profile.id}>{profile.name}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold mb-1">
              Task Name:
              <input
                className="border rounded p-2 w-full"
                type="text"
                name="name"
                value={newTask.name}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold mb-1">
              Description:
              <textarea
                className="border rounded p-2 w-full"
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
              ></textarea>
            </label>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold mb-1">
              Deadline:
              <input
                className="border rounded p-2 w-full"
                type="date"
                name="deadline"
                value={newTask.deadline}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-2">Task List</h2>
        <ul>
          {tasks.map(task => (
            <li key={task.id} className="border p-2 mb-2 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{task.name}</h3>
                <p>{task.description}</p>
                <p>Deadline: {task.deadline}</p>
                <p>Status: {task.status}</p>
              </div>
              <div>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  onClick={() => handleUpdateTaskStatus(task.id, 'completed')}
                >
                  Complete
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleUpdateTaskStatus(task.id, 'pending')}
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

