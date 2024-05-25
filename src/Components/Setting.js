import React, { useState } from 'react';

const Setting = () => {
  // const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('english');
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    browser: true
  });

  // const handleThemeChange = (e) => {
  //   setTheme(e.target.value);
  //   // Apply theme change
  // };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    // Apply language change
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationPreferences((prevState) => ({
      ...prevState,
      [name]: checked
    }));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-6 max-w-md w-full bg-white rounded-xl shadow-md space-y-6">
        <h2 className="text-3xl font-bold text-center mb-6">Settings</h2>
        
     
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Language</h3>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Notification Preferences</h3>
          
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="email"
              checked={notificationPreferences.email}
              onChange={handleNotificationChange}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <span className="ml-2">Receive email notifications</span>
          </label>
          
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="browser"
              checked={notificationPreferences.browser}
              onChange={handleNotificationChange}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <span className="ml-2">Receive browser notifications</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Setting;
