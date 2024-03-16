import React, { useState } from 'react';
import Sidebar from './Sidebar';



const ProfileManager = ({sidebar}) => {
  const [profiles, setProfiles] = useState([
    { id: 1, name: 'John Doe', role: 'Developer' },
    { id: 2, name: 'Jane Smith', role: 'Designer' },
    // Add more profiles as needed
  ]);

  const [newProfile, setNewProfile] = useState({ name: '', role: '' });
  const [editingProfile, setEditingProfile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfile({ ...newProfile, [name]: value });
  };

  const handleAddProfile = () => {
    setProfiles([...profiles, { id: profiles.length + 1, ...newProfile }]);
    setNewProfile({ name: '', role: '' });
  };

  const handleEditProfile = (profileId) => {
    const profileToEdit = profiles.find(profile => profile.id === profileId);
    setEditingProfile(profileToEdit);
    setNewProfile({ name: profileToEdit.name, role: profileToEdit.role });
  };

  const handleUpdateProfile = () => {
    const updatedProfiles = profiles.map(profile =>
      profile.id === editingProfile.id ? { ...profile, ...newProfile } : profile
    );
    setProfiles(updatedProfiles);
    setNewProfile({ name: '', role: '' });
    setEditingProfile(null);
  };

  const handleRemoveProfile = (profileId) => {
    const updatedProfiles = profiles.filter(profile => profile.id !== profileId);
    setProfiles(updatedProfiles);
  };

  return (
    <div className='flex'>
    
    <Sidebar sidebar={sidebar}/>
    <div className="profile-manager-container p-4">
      <h1 className="text-2xl font-bold mb-4">Profile Manager</h1>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Add/Edit Profile</h2>
        <form>
          <div className="mb-2">
            <label className="block text-sm font-semibold mb-1">
              Name:
              <input
                className="border rounded p-2 w-full"
                type="text"
                name="name"
                value={newProfile.name}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold mb-1">
              Role:
              <input
                className="border rounded p-2 w-full"
                type="text"
                name="role"
                value={newProfile.role}
                onChange={handleInputChange}
              />
            </label>
          </div>
          {editingProfile ? (
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleUpdateProfile}
            >
              Update Profile
            </button>
          ) : (
            <button
              type="button"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleAddProfile}
            >
              Add Profile
            </button>
          )}
        </form>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-2">Profiles</h2>
        <ul>
          {profiles.map(profile => (
            <li key={profile.id} className="flex items-center justify-between mb-2">
              <span>{profile.name} - {profile.role}</span>
              <div className="space-x-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  onClick={() => handleEditProfile(profile.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleRemoveProfile(profile.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default ProfileManager;
