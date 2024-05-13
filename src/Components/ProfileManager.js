import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileList from './ProfileList'; // Import the ProfileList component

const ProfileManager = () => {
  const [profiles, setProfiles] = useState([]);
  const [newProfile, setNewProfile] = useState({ name: '', role: '' });
  const [editingProfile, setEditingProfile] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get('http://localhost:5001/profiles');
      setProfiles(response.data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfile({ ...newProfile, [name]: value });
  };

  const handleAddProfile = async () => {
    if (!newProfile.name.trim() || !newProfile.role.trim()) {
      showNotification('Name and role fields cannot be empty', 'error');
      return;
    }
  
    try {
      await axios.post('http://localhost:5001/profiles', newProfile);
      setNewProfile({ name: '', role: '' });
      fetchProfiles();
      showNotification('Profile added successfully', 'success');
    } catch (error) {
      console.error('Error adding profile:', error);
      showNotification('Failed to add profile', 'error');
    }
  };
  

  const handleEditProfile = (profileId) => {
    const profileToEdit = profiles.find(profile => profile.id === profileId);
    setEditingProfile(profileToEdit);
    setNewProfile({ name: profileToEdit.name, role: profileToEdit.role });
  };

  const handleUpdateProfile = async () => {
    try {
      await axios.put(`http://localhost:5001/profiles/${editingProfile.id}`, newProfile);
      fetchProfiles();
      setNewProfile({ name: '', role: '' });
      setEditingProfile(null);
      showNotification('Profile updated successfully', 'success');
    } catch (error) {
      console.error('Error updating profile:', error);
      showNotification('Failed to update profile', 'error');
    }
  };

  const handleRemoveProfile = async (profileId) => {
    try {
      await axios.delete(`http://localhost:5001/profiles/${profileId}`);
      fetchProfiles();
      showNotification('Profile removed successfully', 'success');
    } catch (error) {
      console.error('Error removing profile:', error);
      showNotification('Failed to remove profile', 'error');
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="task-manager-wrapper p-4 bg-gray-100">
      <div className="task-manager-container max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4 text-left">Profile Manager</h1>

        {/* Notification */}
        {notification && (
          <div
            className={`text-white px-4 py-2 rounded ${
              notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } mb-4`}
          >
            {notification.message}
          </div>
        )}

        {/* Add/Edit Profile Form */}
        <div className="mb-8 bg-white rounded-lg p-6">
          <h2 className="text-lg font-bold mb-2">Add/Edit Profile</h2>
          <form className="flex flex-col space-y-4">
            <input
              className="border rounded p-2"
              type="text"
              placeholder="Name"
              name="name"
              value={newProfile.name}
              onChange={handleInputChange}
            />
            <input
              className="border rounded p-2"
              type="text"
              placeholder="Role"
              name="role"
              value={newProfile.role}
              onChange={handleInputChange}
            />
            {editingProfile ? (
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-auto"
                onClick={handleUpdateProfile}
              >
                Update Profile
              </button>
            ) : (
              <button
                type="button"
                className="bg-orange-500 text-white px-3 py-2 rounded hover:bg-orange-600 mr-auto"
                onClick={handleAddProfile}
              >
                Add Profile
              </button>
            )}
          </form>
        </div>

        {/* Profiles List */}
        <div className="overflow-hidden">
          <ProfileList 
            profiles={profiles} 
            handleEditProfile={handleEditProfile} 
            handleRemoveProfile={handleRemoveProfile} 
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileManager;
