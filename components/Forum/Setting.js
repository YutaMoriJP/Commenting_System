import React, { useState } from 'react';
import { useSetting, useToggleSetting } from './SettingProvider';
import { useThemeContext, useToggleTheme } from './ThemeProvider';
import './forum.css';

export default function Setting() {
  const checked = useThemeContext();
  const toggleTheme = useToggleTheme();
  const [profile, setProfile] = useState(false);
  const [settingStored, setSettingStored] = useState(false);
  const toggleSetting = useToggleSetting();
  const setting = useSetting();
  const handleClick = () => {
    toggleSetting({
      type: 'setting',
      payload: { darkmode: checked, private: profile },
    });
    setSettingStored(prevSetting => !prevSetting);
  };
  console.log(setting);
  if (!settingStored) {
    return (
      <div className="setting">
        <h4>User Setting:</h4>
        <label>Subscribe to Dark Mode?</label>
        <input type="checkbox" checked={checked} onChange={toggleTheme} />
        <label>Keep Profile Private</label>
        <input
          type="checkbox"
          checked={profile}
          onChange={() => setProfile(prevProfile => !prevProfile)}
        />
        <button onClick={handleClick}>Save</button>
      </div>
    );
  }
  return (
    <div className="setting">
      <button onClick={() => setSettingStored(prevSetting => !prevSetting)}>
        Reset
      </button>
      <h4>Your User Setting:</h4>
      <p>Dark mode: {setting.darkmode ? 'ON' : 'OFF'}</p>
      <p>Private Account: {setting.private ? 'ON' : 'OFF'}</p>
    </div>
  );
}
