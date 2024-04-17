import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ taskName: '', employee: '', deadline: '', status: 'Pending' , description: '' });
  const [editingTask, setEditingTask] = useState(null);
  const [alert, setAlert] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(3);

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
    if (!newTask.taskName.trim() || !newTask.employee.trim() || !newTask.deadline.trim()) {
      setAlert('Please fill all the details.');
      return;
    }

    try {
      await axios.post('http://localhost:5001/tasks', newTask);
      fetchTasks();
      setNewTask({ taskName: '', employee: '', deadline: '', status: 'Pending' });
      setAlert('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    setEditingTask(taskToEdit);
    setNewTask({ taskName: taskToEdit.taskName, employee: taskToEdit.employee, deadline: taskToEdit.deadline, status: taskToEdit.status });
  };

  const handleUpdateTask = async () => {
    try {
      await axios.put(`http://localhost:5001/tasks/${editingTask.id}`, newTask);
      fetchTasks();
      setNewTask({ taskName: '', employee: '', deadline: '', status: 'Pending' });
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
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

  const addInitialTask = () => {
    if (tasks.length === 0) {
      setTasks([
        { id: 1, taskName: 'Sample Task1', employee: 'Sample Employee1', deadline: '2024-12-31', status: 'Pending', description: 'Complete it asap' },
        { id: 2, taskName: 'Sample Task2', employee: 'Sample Employee2', deadline: '2024-12-31', status: 'Pending' , description: 'Complete it asap' },
        { id: 3, taskName: 'Sample Task3', employee: 'Sample Employee3', deadline: '2024-12-31', status: 'Pending' , description: 'Complete it asap' },
        { id: 4, taskName: 'Sample Task4', employee: 'Sample Employee4', deadline: '2024-12-31', status: 'Pending' , description: 'Complete it asap'},
        { id: 5, taskName: 'Sample Task5', employee: 'Sample Employee5', deadline: '2024-12-31', status: 'Pending' , description: 'Complete it asap'},
        { id: 6, taskName: 'Sample Task6', employee: 'Sample Employee6', deadline: '2024-12-31', status: 'Pending' , description: 'Complete it asap'}
      ]);
    }
  };

  useEffect(() => {
    addInitialTask();
  }, []);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.filter(task => {
    if (filterCriteria === 'all') {
      return true;
    } else if (filterCriteria === 'pending') {
      return task.status === 'Pending';
    } else if (filterCriteria === 'completed') {
      return task.status === 'Completed';
    }
  }).slice(indexOfFirstTask, indexOfLastTask);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="task-manager-container p-4">
      <h1 className="text-xl text-orange-400 mb-4 tracking-wide px-12 py-10 font-bold ">TASK MANAGER</h1>
      <div className="border border-white rounded-2xl px-4 w-11/12 ml-12 bg-white mb-7">
        <h2 className="text-lg font-bold mb-4 px-5 my-5">Add Tasks</h2>
        {alert && <p className="text-red-500">{alert}</p>}
        <form className='flex flex-wrap justify-between'>
          {/* Input fields */}
          <div className="mb-1 mr-5">
            <label className="flex text-md font-semibold my-2 w-96 rounded-3xl px-4">
              <input
                className="border rounded-xl p-2 w-96 mb-1 border-slate-50 bg-indigo-50"
                type="text"
                name="taskName"
                value={newTask.taskName}
                placeholder='Task Name'
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="w-1/2 mb-2 mr-48">
            <label className="flex text-md font-semibold my-2 w-96 px-2">
              <input
                className="border rounded-xl p-2 w-96 mb-1 border-slate-50 bg-indigo-50"
                type="text"
                name="employee"
                placeholder='Employee Name'
                value={newTask.employee}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className=" mb-2 mr-3">
            <label className="flex text-md font-semibold my-2 w-96 rounded-3xl px-4">
              <input
                className="border rounded-xl p-2 w-96 mb-1 border-slate-50 bg-indigo-50"
                type="text"
                name="deadline"
                value={newTask.deadline}
                placeholder='Deadline (e.g., 08/04/24)'
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="w-1/2 mb-2 mr-10">
            <label className="flex text-md font-semibold my-2 w-96 px-4">
              <select
                className="border rounded-xl p-2 w-96 mb-1 border-slate-50 bg-indigo-50"
                name="status"
                value={newTask.status}
                onChange={handleInputChange}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </label>
          </div>
          <button
            type="button"
            className="button-3"
            onClick={editingTask ? handleUpdateTask : handleAddTask}
          >
            <span>{editingTask ? 'Update' : 'Add'}</span>
          </button>
        </form>
      </div>
      <br />
      <div className="all-tasks p-4 ml-12 bg-white border-white rounded-2xl w-11/12 mb-4" style={{ height: '400px' }}>
        <select
          className="border rounded-xl px-7 py-2 bg-indigo-50 m-5"
          value={filterCriteria}
          onChange={handleFilterChange}
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending Tasks</option>
          <option value="completed">Completed Tasks</option>
        </select>

        <table className="w-full m-3">
          {/* Table header */}
          <thead>
      <tr>
        <th className="text-xs px-5 pr-1 text-left text-gray-400 ">Task Name</th>
        <th className="text-xs px-12 pl-5 text-left text-gray-400 ">Employee Name</th>
        <th className="text-xs px-15 pr-2 text-left text-gray-400 ">Deadline</th>
        <th className="text-xs px-20 pl-16 text-left text-gray-400 ">Status</th>
      </tr>
    </thead>

          <tbody style={{ overflowY: 'auto' }}>
            {/* Table rows */}
            {currentTasks.map((task, index) => (
        <React.Fragment key={task.id}>
          {index !== 0 && ( // Add line above the second row (except the first row)
            <tr>
              <td colSpan="5">
                <hr className="w-full" />
              </td>
            </tr>
          )}
          <tr>
            <td className="text-black px-6 py-2 font-semibold">{task.taskName}</td>
            <td className="text-black px-1 py-2 font-semibold">{task.employee}</td>
            <td className="text-black px-1 py-2 font-semibold">{task.deadline}</td>
            <td className="text-black px-12 py-2 font-semibold">{task.status}</td>
            <td className="text-black px-5 py-2 font-semibold">
              <button className="bg-green-400 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-6 shadow-custom" onClick={() => handleEditTask(task.id)}>Complete</button>
              <button className="bg-orange-400 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded mr-6" onClick={() => handleRemoveTask(task.id)}>Pending</button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onClick={() => handleRemoveTask(task.id)}>Remove</button>
            </td>
          </tr>
          <tr>
                  <td colSpan="5" className="px-6 py-2 text-s text-gray-500 ">Description: {task.description}</td>
                </tr>
          <tr>
            <td colSpan="5">
              <hr className="w-full" />
            </td>
          </tr>
        </React.Fragment>
      ))}

          </tbody>
        </table>
      </div>

      {tasksPerPage < tasks.length && (
        <div className="pagination">
          <ul className="flex justify-center mt-4">
            {[...Array(Math.ceil(tasks.length / tasksPerPage))].map((_, index) => (
              <li key={index} className={currentPage === index + 1 ? 'mr-2 font-bold text-white border-black bg-orange-400 w-7 text-center' : 'mr-2'}>
                <button onClick={() => paginate(index + 1)}>{index + 1}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskManager;
