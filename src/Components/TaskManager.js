import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [profiles, setProfiles] = useState({}); // State to store profiles
  const [newTask, setNewTask] = useState({
    profileId: '',
    name: '',
    description: '',
    deadline: '',
    status: 'pending',
  });

  useEffect(() => {
    fetchTasks();
    fetchProfiles(); // Fetch profiles when component mounts
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5001/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchProfiles = async () => {
    try {
      const response = await axios.get('http://localhost:5001/profiles');
      // Convert the profiles array to an object for easier access
      const profilesObject = response.data.reduce((acc, profile) => {
        acc[profile.id] = profile;
        return acc;
      }, {});
      setProfiles(profilesObject);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = async () => {
    try {
      await axios.post('http://localhost:5001/tasks', newTask);
      setNewTask({
        profileId: '',
        name: '',
        description: '',
        deadline: '',
        status: 'pending',
      });
      fetchTasks(); // Fetch updated task list after adding a new task
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.put(`http://localhost:5001/tasks/${taskId}`, { status: newStatus });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleRemoveTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5001/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  return (
    <div className="task-manager-container p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Add Task</h2>
        <form>
          <div className="mb-2">
            <label className="block text-sm font-semibold mb-1">Profile:</label>
            <select
              className="border rounded p-2 w-full"
              name="profileId"
              onChange={handleInputChange}
              value={newTask.profileId}
            >
              <option value="" disabled>Select Profile</option>
              {Object.values(profiles).map(profile => (
                <option key={profile.id} value={profile.id}>{profile.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold mb-1">Task Name:</label>
            <input
              className="border rounded p-2 w-full"
              type="text"
              name="name"
              value={newTask.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold mb-1">Description:</label>
            <textarea
              className="border rounded p-2 w-full"
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold mb-1">Deadline:</label>
            <input
              className="border rounded p-2 w-full"
              type="date"
              name="deadline"
              value={newTask.deadline}
              onChange={handleInputChange}
            />
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
                <p>Profile: {profiles[task.profileId]?.name}</p> {/* Display profile name */}
              </div>
              <div>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
                  onClick={() => handleUpdateTaskStatus(task.id, 'completed')}
                >
                  Complete
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mr-2"
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
