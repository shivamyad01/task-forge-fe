import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    profileId: '',
    name: '',
    description: '',
    deadline: '',
    status: 'pending',
  });

  useEffect(() => {
    fetchTasks();
  }, []);

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

  return (
    <div className="task-manager-container p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      {/* Add Task Form */}
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Add Task</h2>
        <form>
          {/* Profile */}
          <div className="mb-2">
            <label className="block text-sm font-semibold mb-1">Profile:</label>
            <select
              className="border rounded p-2 w-full"
              name="profileId"
              value={newTask.profileId}
              onChange={handleInputChange}
            >
              <option value="" disabled>Select Profile</option>
              <option value="1">John Doe</option>
              <option value="2">Jane Smith</option>
              {/* Add more profiles as needed */}
            </select>
          </div>
          {/* Task Name */}
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
          {/* Description */}
          <div className="mb-2">
            <label className="block text-sm font-semibold mb-1">Description:</label>
            <textarea
              className="border rounded p-2 w-full"
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          {/* Deadline */}
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
          {/* Add Task Button */}
          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </form>
      </div>

      {/* Task List */}
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
                {/* Button to mark task as complete */}
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  onClick={() => handleUpdateTaskStatus(task.id, 'completed')}
                >
                  Complete
                </button>
                {/* Button to mark task as pending */}
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleUpdateTaskStatus(task.id, 'pending')}
                >
                  Mark Pending
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
