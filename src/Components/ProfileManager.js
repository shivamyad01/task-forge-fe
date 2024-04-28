import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileManager = () => {
  const [profiles, setProfiles] = useState([]);
  const [newProfile, setNewProfile] = useState({ name: '', role: '', email: '', number: '' });
  const [editingProfile, setEditingProfile] = useState(null);
  const [alert, setAlert] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [profilesPerPage] = useState(3);

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
    // Check if all fields are not empty
    if (!newProfile.name.trim() || !newProfile.role.trim() || !newProfile.email.trim() || !newProfile.number.trim()) {
      setAlert('Please fill all the details.');
      return;
    }

    try {
      await axios.post('http://localhost:5001/profiles', newProfile);
      fetchProfiles();
      setNewProfile({ name: '', role: '', email: '', number: '' });
      setAlert('');
    } catch (error) {
      console.error('Error adding profile:', error);
    }
  };

  const handleEditProfile = (profileId) => {
    const profileToEdit = profiles.find(profile => profile.id === profileId);
    setEditingProfile(profileToEdit);
    setNewProfile({ name: profileToEdit.name, role: profileToEdit.role, email: profileToEdit.email, number: profileToEdit.number });
  };

  const handleUpdateProfile = async () => {
    try {
      await axios.put(`http://localhost:5001/profiles/${editingProfile.id}`, newProfile);
      fetchProfiles();
      setNewProfile({ name: '', role: '', email: '', number: '' });
      setEditingProfile(null);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleRemoveProfile = async (profileId) => {
    try {
      await axios.delete(`http://localhost:5001/profiles/${profileId}`);
      fetchProfiles();
    } catch (error) {
      console.error('Error removing profile:', error);
    }
  };

  const addInitialProfile = () => {
    if (profiles.length === 0) {
      setProfiles([
        { id: 1, name: 'Aryan', role: 'designer', number: '7898266241', email: 'abc@gmail.com' },
        { id: 2, name: 'Aryan', role: 'designer', number: '7898266241', email: 'abc@gmail.com' },
        { id: 3, name: 'Aryan', role: 'designer', number: '7898266241', email: 'abc@gmail.com' },
        { id: 4, name: 'Aryan', role: 'designer', number: '7898266241', email: 'abc@gmail.com' }
      ]);
    }
  };

  useEffect(() => {
    addInitialProfile();
  }, []); // Only run once when the component mounts

  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = profiles.slice(indexOfFirstProfile, indexOfLastProfile);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="profile-manager-container p-4">
      <h1 className="text-xl text-orange-400 mb-4 tracking-wide px-12 py-10 font-bold ">PROFILE MANAGER</h1>
      <div className="border border-white rounded-2xl px-4 w-11/12 ml-12 bg-white mb-7">
        <h2 className="text-lg font-bold mb-4 px-5 my-5 ">Add Profiles</h2>
        {alert && <p className="text-red-500">{alert}</p>}
        <form className='flex flex-wrap justify-between'>
          <div className="mb-1 mr-5">
            <label className="flex text-md font-semibold my-2 w-96 rounded-3xl px-4">
              <input
                className="border rounded-xl p-2 w-96 mb-1 border-slate-50 bg-indigo-50"
                type="text"
                name="name"
                value={newProfile.name}
                placeholder='Name'
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="w-1/2 mb-2 mr-48">
            <label className="flex text-md font-semibold my-2 w-96 px-2">
              <input
                className="border rounded-xl p-2 w-96 mb-1 border-slate-50 bg-indigo-50"
                type="text"
                name="number"
                placeholder='Number'
                value={newProfile.number}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className=" mb-2 mr-3">
            <label className="flex text-md font-semibold my-2 w-96 rounded-3xl px-4">
              <input
                className="border rounded-xl p-2 w-96 mb-1 border-slate-50 bg-indigo-50"
                type="text"
                name="role"
                value={newProfile.role}
                placeholder='Role'
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="w-1/2 mb-2 mr-10">
            <label className="flex text-md font-semibold my-2 w-96 px-4">
              <input
                className="border rounded-xl p-2 w-96 mb-1 border-slate-50 bg-indigo-50"
                type="text"
                name="email"
                placeholder='Email'
                value={newProfile.email}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <button
            type="button"
            className="button-3"
            onClick={editingProfile ? handleUpdateProfile : handleAddProfile}
          >
            <span> Add</span>
          </button>
        </form>
      </div>
      <br />
      <div className="all-profiles p-4 ml-12 bg-white border-white rounded-2xl  w-11/12 mb-4">
        <h2 className="text-lg font-bold mb-5 px-5">All Profiles</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-xs px-5 pr-1 text-left text-gray-400">Customer Name</th>
              <th className="text-xs px-12 pl-5 text-left text-gray-400">Role</th>
              <th className="text-xs px-15 pr-2 text-left text-gray-400">Phone Number</th>
              <th className="text-xs px-20 pl-16 text-left text-gray-400">Email</th>
            </tr>
          </thead>
          <tbody>
            {currentProfiles.map(profile => (
              <tr key={profile.id}>
                <td className="text-black px-8 py-2">{profile.name}</td>
                <td className="text-black px-1 py-2">{profile.role}</td>
                <td className="text-black px-1 py-2">{profile.number}</td>
                <td className="text-black px-7 py-2">{profile.email}</td>
                <td className="text-black px-5 py-2">
                  <button className="bg-green-400 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-6" onClick={() => handleEditProfile(profile.id)}>Edit</button>
                  <button className="bg-red-400 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onClick={() => handleRemoveProfile(profile.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {profilesPerPage < profiles.length && (
          <div className="pagination">
            <ul className="flex justify-center mt-4">
              {[...Array(Math.ceil(profiles.length / profilesPerPage))].map((_, index) => (
                <li key={index} className={currentPage === index + 1 ? 'mr-2 font-bold text-white border-black bg-orange-400 w-7 text-center' : 'mr-2'}>
                  <button onClick={() => paginate(index + 1)}>{index + 1}</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileManager;
