import React from 'react';

const ProfileList = ({ profiles, handleEditProfile, handleRemoveProfile }) => {
  return (
    
    <div className="">
     <h2 className="text-lg font-bold mb-4">Profile List</h2>
      
      <ul className="space-y-4 profiles-list overflow-y-auto max-h-80">
        {profiles.map(profile => (
          <li key={profile.id} className="flex items-center justify-between bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                <span className="text-gray-600 text-lg font-semibold">{profile.name.charAt(0)}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{profile.name}</h3>
                <p className="text-gray-600">{profile.role}</p>
              </div>
            </div>
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
  );
};

export default ProfileList;
