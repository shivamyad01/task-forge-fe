import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import { getProfiles } from '../api/profileService';
import { getTasks, addTask, updateTaskStatus as updateTaskStatusApi, removeTask as removeTaskApi } from '../api/taskService';

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
  const totalTasks = tasks.length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;

  useEffect(() => {
    fetchProfiles();
    fetchTasks();
  }, []);

  const fetchProfiles = async () => {
    try {
      const data = await getProfiles();
      setProfiles(data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
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
      await addTask(newTask);
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
      await updateTaskStatusApi(taskId, newStatus);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleRemoveTask = async (taskId) => {
    try {
      await removeTaskApi(taskId);
      fetchTasks();
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-left text-slate-800">Task Manager</h1>
            <p className="text-xs text-slate-500 mt-1">Create, track and update tasks for your profiles.</p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">Total: {totalTasks}</span>
            <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 font-medium">Completed: {completedCount}</span>
          </div>
        </div>

        <div className="mb-8 bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">Add Task</h2>
            {tasks.length > 0 && (
              <span className="text-xs text-gray-400">Recently added tasks appear below</span>
            )}
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-1">
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
            <div className="md:col-span-1">
              <label className="block text-sm font-semibold mb-1">Task Name:</label>
              <input
                className="border rounded p-2 w-full"
                type="text"
                name="name"
                value={newTask.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1">Description:</label>
              <textarea
                className="border rounded p-2 w-full h-24 resize-none"
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-semibold mb-1">Deadline:</label>
              <input
                className="border rounded p-2 w-full"
                type="date"
                name="deadline"
                value={newTask.deadline}
                onChange={handleInputChange}
              />
            </div>
            <div className="md:col-span-2 flex justify-start mt-2">
              <button
                type="button"
                className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 text-sm sm:text-base"
                onClick={handleAddTask}
              >
                Add Task
              </button>
            </div>
          </form>
        </div>

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
