import client from './client';

export async function getProfiles() {
  const { data } = await client.get('/api/profiles');
  return data;
}

export async function addProfile(payload) {
  const { data } = await client.post('/api/profiles', payload);
  return data;
}

export async function updateProfile(id, payload) {
  const { data } = await client.put(`/api/profiles/${id}`, payload);
  return data;
}

export async function removeProfile(id) {
  const { data } = await client.delete(`/api/profiles/${id}`);
  return data;
}
