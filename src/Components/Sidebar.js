import React from 'react';
import Users from '../assets/ui/id-card-fill.png';
import dashBoard from '../assets/ui/dashboard.png';
import setting from '../assets/ui/settings-3-fill.png';
import task from '../assets/ui/task-line.png';
import Reports from '../assets/ui/questionnaire-fill.png';

import { useNavigate } from 'react-router-dom';
import './sidebar.css'

function Sidebar({sidebar}) {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path, { replace: true });
  };

  return (
    <div className={`relative sidebar w-[13%] h-[89vh] bg-black pl-4 pt-7 flex flex-col gap-6 ${sidebar ? "" : "w-[3.4%] "}`}>
      <div className=' flex items-center cursor-pointer w-fit   sidebaritem' onClick={() => handleClick('/Dashboard')}>
        <img className="w-[20px] mr-[20px] filter invert" src={dashBoard} alt="" />
        <h1 className={`text-white font-semibold ${sidebar ? "" : "hidden"}`} onClick={() => handleClick('/Dashboard')}>Dashboard</h1>
      </div>

      <div className='flex items-center cursor-pointer w-fit sidebaritem' onClick={() => handleClick('/profile')}>
        <img className="w-[20px] mr-[20px] filter invert" src={Users} alt="" />
        <h1 className={`text-white font-semibold ${sidebar ? "" : "hidden"}`} onClick={() => handleClick('/profile')}>Users</h1>
      </div>

      <div className='flex items-center cursor-pointer w-fit sidebaritem' onClick={() => handleClick('/TaskManagar')}>
        <img className="w-[20px] mr-[20px] filter invert" src={task} alt="" />
        <h1 className={`text-white font-semibold ${sidebar ? "" : "hidden"}`} onClick={() => handleClick('/TaskManagar')}>Task</h1>
      </div>

      <div className='flex items-center cursor-pointer w-fit sidebaritem' onClick={() => handleClick('/Reports')}>
        <img className="w-[20px] mr-[20px] filter invert" src={Reports} alt="" />
        <h1 className={`text-white font-semibold ${sidebar ? "" : "hidden"}`} onClick={() => handleClick('/Reports')}>Reports</h1>
      </div>

      <div className='flex items-center pb-4 cursor-pointer w-fit absolute bottom-0 sidebaritema' onClick={() => handleClick('/Setting')}>
        <img className="w-[20px] mr-[20px] filter invert" src={setting} alt="" />
        <h1 className={`text-white font-semibold ${sidebar ? "" : "hidden"}`} onClick={() => handleClick('/Setting')}>Setting</h1>
      </div>
    </div>
  );
}



export default Sidebar;

