import React, { useState } from 'react';


const TaskManager = () => {
  const [tasks, setTasks] = useState([
    { id: 1, profileId: 1, name: 'Task 1', description: 'Description 1', deadline: '2024-03-15', status: 'pending' },
    { id: 2, profileId: 2, name: 'Task 2', description: 'Description 2', deadline: '2024-03-20', status: 'pending' },
    // Add more tasks as needed
  ]);

  const [newTask, setNewTask] = useState({
    profileId: '',
    name: '',
    description: '',
    deadline: '',
    status: 'pending',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = () => {
    setTasks([...tasks, { id: tasks.length + 1, ...newTask }]);
    setNewTask({
      profileId: '',
      name: '',
      description: '',
      deadline: '',
      status: 'pending',
    });
  };

  const handleUpdateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const handleFilterTasks = (status) => {
    // Implement filtering logic based on task status
    // For simplicity, here we're just setting a filteredTasks state
    const filteredTasks = tasks.filter(task => task.status === status);
    setTasks(filteredTasks);
  };

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
                {/* Populate with profiles from your data */}
                <option value="" disabled>Select Profile</option>
                <option value="1">John Doe</option>
                <option value="2">Jane Smith</option>
                {/* Add more profiles as needed */}
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
        <div className="flex space-x-2 mb-2">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            onClick={() => handleFilterTasks('all')}
          >
            All
          </button>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            onClick={() => handleFilterTasks('pending')}
          >
            Pending
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => handleFilterTasks('completed')}
          >
            Completed
          </button>
        </div>
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
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskManager;
