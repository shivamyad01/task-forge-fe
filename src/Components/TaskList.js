// TaskList.js
import React from 'react';

const TaskList = ({ tasks, handleUpdateTaskStatus, handleRemoveTask, filterCriteria, setFilterCriteria }) => {
  const filteredTasks = tasks.filter(task => {
    if (filterCriteria === 'all') {
      return true;
    } else {
      return task.status === filterCriteria;
    }
  });

  return (
    <div className="task-list-container" >
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">Filter Tasks</h2>
        <select
          className="border rounded p-2"
          value={filterCriteria}
          onChange={(e) => setFilterCriteria(e.target.value)}
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending Tasks</option>
          <option value="completed">Completed Tasks</option>
        </select>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Task List</h2>
        <ul style={{ maxHeight: '480px', overflowY: 'auto' }}>
          {filteredTasks.slice().reverse().map(task => (
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
  );
};

export default TaskList;
