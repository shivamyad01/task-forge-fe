import React from 'react';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

const ProfileList = ({ profiles, handleEditProfile, handleRemoveProfile }) => {
  const sortedProfiles = profiles.slice().reverse();
  const hasProfiles = sortedProfiles.length > 0;

  return (
    <div className="">
      <h2 className="text-lg font-bold mb-4">Profile List</h2>

      {!hasProfiles ? (
        <div className="border border-dashed border-gray-300 rounded-lg p-4 text-sm text-gray-500 bg-slate-50">
          No profiles yet. Add a profile above to start assigning tasks.
        </div>
      ) : (
        <ul className="space-y-4 profiles-list overflow-y-auto max-h-80">
        {sortedProfiles.map(profile => (
          <li key={profile.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white shadow-md rounded-lg p-4 gap-3">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                <span className="text-gray-600 text-lg font-semibold">{profile.name.charAt(0)}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{profile.name}</h3>
                <p className="text-gray-600">{profile.role}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:ml-auto">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 inline-flex items-center gap-1 text-sm"
                onClick={() => handleEditProfile(profile.id)}
              >
                <EditRoundedIcon fontSize="inherit" />
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 inline-flex items-center gap-1 text-sm"
                onClick={() => handleRemoveProfile(profile.id)}
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
  );
};

export default ProfileList;
