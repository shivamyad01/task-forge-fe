import client from './client';

export async function getTasks() {
  const { data } = await client.get('/api/tasks');
  return data;
}

export async function addTask(payload) {
  const { data } = await client.post('/api/tasks', payload);
  return data;
}

export async function updateTaskStatus(id, status) {
  const { data } = await client.put(`/api/tasks/${id}`, { status });
  return data;
}

export async function removeTask(id) {
  const { data } = await client.delete(`/api/tasks/${id}`);
  return data;
}

export async function getOverdueTasks() {
  const { data } = await client.get('/api/tasks/overdue');
  return data;
}
