// TaskList.js
import React from 'react';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

const TaskList = ({ tasks, handleUpdateTaskStatus, handleRemoveTask, filterCriteria, setFilterCriteria }) => {
  const filteredTasks = tasks.filter(task => {
    if (filterCriteria === 'all') {
      return true;
    } else {
      return task.status === filterCriteria;
    }
  });

  return (
    <div className="task-list-container mt-8 bg-white rounded-lg p-4 sm:p-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <FilterListRoundedIcon className="text-gray-500" fontSize="small" />
          <h2 className="text-lg font-bold">Filter Tasks</h2>
        </div>
        <select
          className="border rounded p-2 w-full max-w-xs text-sm"
          value={filterCriteria}
          onChange={(e) => setFilterCriteria(e.target.value)}
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending Tasks</option>
          <option value="completed">Completed Tasks</option>
        </select>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 mt-4">Task List</h2>
        {filteredTasks.length === 0 ? (
          <div className="border border-dashed border-gray-300 rounded-lg p-4 text-sm text-gray-500 bg-slate-50">
            No tasks match this filter. Try switching the filter above or add a new task.
          </div>
        ) : (
          <ul className="max-h-96 overflow-y-auto space-y-4">
            {filteredTasks.slice().reverse().map(task => (
              <li key={task.id} className="border p-4 flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white rounded-lg shadow-sm">
                <div className="flex flex-col">
                  <p className="font-bold text-lg mb-1">Profile: {task.profile_name}</p>
                  <h2 className="text-lg font-semibold mb-1">Task: {task.name}</h2>
                  <p className="text-sm mb-2">Description: {task.description}</p>
                  <p className={`text-sm font-semibold ${task.status === 'completed' ? 'text-green-600' : 'text-red-600'}`}>Status: {task.status}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-3 lg:mt-0">
                  <button
                    className={`bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 focus:outline-none text-sm inline-flex items-center gap-1`}
                    onClick={() => handleUpdateTaskStatus(task.id, 'completed')}
                  >
                    <CheckCircleRoundedIcon fontSize="inherit" />
                    Complete
                  </button>
                  <button
                    className={`bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 focus:outline-none text-sm inline-flex items-center gap-1`}
                    onClick={() => handleUpdateTaskStatus(task.id, 'pending')}
                  >
                    <ReplayRoundedIcon fontSize="inherit" />
                    Pending
                  </button>
                  <button
                    className={`bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600 focus:outline-none text-sm inline-flex items-center gap-1`}
                    onClick={() => handleRemoveTask(task.id)}
                  >
                    <DeleteForeverRoundedIcon fontSize="inherit" />
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskList;
