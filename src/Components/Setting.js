import React, { useState } from 'react';

function Setting() {
  // Example state for theme selection
  const [theme, setTheme] = useState('light');

  // Function to handle theme change
  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    // You can add logic here to update the theme in your application
  };

  return (
    <div>
      <h2>Settings</h2>

      {/* Theme selection */}
      <div>
        <h3>Theme</h3>
        <select value={theme} onChange={(e) => handleThemeChange(e.target.value)}>
          <option value="light">Light Theme</option>
          <option value="dark">Dark Theme</option>
        </select>
      </div>

      {/* Add more settings options here */}
    </div>
  );
}

export default Setting;
