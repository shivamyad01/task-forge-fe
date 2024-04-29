import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      const response = await axios.get('http://localhost:5001/profiles');
      setProfiles(response.data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5001/tasks');
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
      await axios.post('http://localhost:5001/tasks', newTask);
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

  const handleFilterChange = (e) => {
    setFilterCriteria(e.target.value);
  };

  const filteredTasks = tasks.filter(task => {
    if (filterCriteria === 'all') {
      return true;
    } else {
      return task.status === filterCriteria;
    }
  });

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

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Filter Tasks</h2>
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
          <h2 className="text-xl font-bold mb-4">Task List</h2>
          <ul>
            {filteredTasks.map(task => (
              <li key={task.id} className="border p-4 mb-4 flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white rounded-lg">
                <div className="flex flex-col">
                  <p className="font-bold text-lg mb-1">Profile: {task.profile_name}</p>
                  <h2 className="text-lg font-semibold mb-1">Task: {task.name}</h2>
                  <p className="text-sm mb-2">Description: {task.description}</p>
                  <p className={`text-sm font-semibold ${task.status === 'completed' ? 'text-green-600' : 'text-red-600'}`}>Status: {task.status}</p>
                </div>
                <div className="flex mt-2 lg:mt-0">
                  <button
                    className={`bg-green-500 text-white px-3 py-2 rounded mr-2 hover:bg-green-600 focus:outline-none`}
                    onClick={() => handleUpdateTaskStatus(task.id, 'completed')}
                  >
                    Complete
                  </button>
                  <button
                    className={`bg-red-500 text-white px-3 py-2 rounded mr-2 hover:bg-red-600 focus:outline-none`}
                    onClick={() => handleUpdateTaskStatus(task.id, 'pending')}
                  >
                    Mark Pending
                  </button>
                  <button
                    className={`bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600 focus:outline-none`}
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
    </div>
  );
};

export default TaskManager;
