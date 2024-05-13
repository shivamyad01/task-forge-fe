import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './TaskList'; // Import the TaskList component
import { API_BASE_URL } from '../utils/constant';


const TaskManager = () => {
  const [profiles, setProfiles] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    profileId: '',
    name: '',
    description: '',
    deadline: '',
    status: 'pending',
  });
  const [filterCriteria, setFilterCriteria] = useState('all');

  useEffect(() => {
    fetchProfiles();
    fetchTasks();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/profiles`); // Using API_BASE_URL
      setProfiles(response.data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`); // Using API_BASE_URL
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = async () => {
    try {
      await axios.post(`${API_BASE_URL}/tasks`, newTask); // Using API_BASE_URL
      fetchTasks();
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

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/tasks/${taskId}`, { status: newStatus }); // Using API_BASE_URL
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleRemoveTask = async (taskId) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${taskId}`); // Using API_BASE_URL
      fetchTasks();
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  return (
    <div className="task-manager-wrapper p-4 bg-gray-100">
      <div className="task-manager-container max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4 text-left">Task Manager</h1>

        <div className="mb-8 bg-white rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Add Task</h2>
          <form className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Profile:</label>
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
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Task Name:</label>
              <input
                className="border rounded p-2 w-full"
                type="text"
                name="name"
                value={newTask.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold mb-1">Description:</label>
              <textarea
                className="border rounded p-2 w-full h-24 resize-none"
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Deadline:</label>
              <input
                className="border rounded p-2 w-full"
                type="date"
                name="deadline"
                value={newTask.deadline}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-2 flex justify-start">
              <button
                type="button"
                className="bg-orange-500 text-white px-7 py-2 rounded hover:bg-orange-600"
                onClick={handleAddTask}
              >
                Add Task
              </button>
            </div>
          </form>
        </div>

        {/* Render the TaskList component */}
        <TaskList
          tasks={tasks}
          handleUpdateTaskStatus={handleUpdateTaskStatus}
          handleRemoveTask={handleRemoveTask}
          filterCriteria={filterCriteria}
          setFilterCriteria={setFilterCriteria}
        />
      </div>
    </div>
  );
};

export default TaskManager;
