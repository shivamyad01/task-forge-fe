import client from './client';

export async function login(email, password) {
  const res = await client.post('/api/users/login', { email, password });
  return res.data; // { token }
}

export async function register(name, email, password) {
  const res = await client.post('/api/users/register', { name, email, password });
  return res.data;
}
