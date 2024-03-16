import React from 'react';
import Users from '../assets/ui/id-card-fill.png';
import dashBoard from '../assets/ui/dashboard.png';
import setting from '../assets/ui/settings-3-fill.png';
import task from '../assets/ui/task-line.png';
import Reports from '../assets/ui/questionnaire-fill.png';
import home from'../assets/ui/home-2-fill.png';

import { useNavigate } from 'react-router-dom';
import './sidebar.css'

function Sidebar({sidebar}) {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path, { replace: true });   
  };

  return (
    <div className={`relative sidebar w-[13%]   h-[89vh]  pl-4 pt-7 flex flex-col gap-6 ${sidebar ? "" : "w-[4.5%] "}`}>
      <div className={` w-[90%] h-[7vh] rounded-md sidebaritem flex   ${sidebar ? "" : "w-[70%] h-[7vh]   "} `}>
      <div className=' flex items-center cursor-pointer w-fit pl-2  sidebaritem' onClick={() => handleClick('/')}>
        <img className="w-[20px] mr-[20px] " src={home} alt="" />
        <h1 className={`text-black font-semibold ${sidebar ? "" : "hidden"}`} onClick={() => handleClick('/')}>Home</h1>
      </div>
      </div>
      <div className={` w-[90%] h-[7vh] rounded-md sidebaritem flex   ${sidebar ? "" : "w-[70%] h-[7vh]   "} `}>
      <div className=' flex items-center cursor-pointer w-fit pl-2  sidebaritem' onClick={() => handleClick('/Dashboard')}>
        <img className="w-[20px] mr-[20px] " src={dashBoard} alt="" />
        <h1 className={`text-black font-semibold ${sidebar ? "" : "hidden"}`} onClick={() => handleClick('/Dashboard')}>Dashboard</h1>
      </div>
      </div>
      
      
      <div className={` w-[90%] h-[7vh] rounded-md sidebaritem flex  ${sidebar ? "" : "w-[70%] h-[7vh]   "} `}>
      <div className='flex items-center cursor-pointer w-fit pl-2 sidebaritem' onClick={() => handleClick('/profile')}>
        <img className="w-[20px] mr-[20px] " src={Users} alt="" />
        <h1 className={`text-black font-semibold ${sidebar ? "" : "hidden"}`} onClick={() => handleClick('/profile')}>profiles</h1>
      </div>
      </div>


      <div className={` w-[90%] h-[7vh] rounded-md sidebaritem flex  ${sidebar ? "" : "w-[70%] h-[7vh]   "} `}>
      <div className='flex items-center cursor-pointer w-fit pl-2 sidebaritem' onClick={() => handleClick('/TaskManagar')}>
        <img className="w-[20px] mr-[20px] " src={task} alt="" />
        <h1 className={`text-black font-semibold ${sidebar ? "" : "hidden"}`} onClick={() => handleClick('/TaskManagar')}>Task</h1>
      </div>
      </div>
      
      <div className={` w-[90%] h-[7vh] rounded-md sidebaritem flex  ${sidebar ? "" : "w-[70%] h-[7vh]   "} `}>
      <div className='flex items-center cursor-pointer w-fit pl-2 sidebaritem' onClick={() => handleClick('/Reports')}>
        <img className="w-[20px] mr-[20px] " src={Reports} alt="" />
        <h1 className={`text-black font-semibold ${sidebar ? "" : "hidden"}`} onClick={() => handleClick('/Reports')}>Reports</h1>
      </div>
      </div>

      <div className={`w-[83%] h-[7vh]  rounded-md sidebaritem flex absolute bottom-0 mb-4 ${sidebar ? "" : "w-[54%] h-[7vh]   "} `}>
      <div className='flex items-center pb-4 pl-2 cursor-pointer w-fit absolute bottom-0 sidebaritema' onClick={() => handleClick('/Setting')}>
        <img className="w-[20px] mr-[20px] " src={setting} alt="" />
        <h1 className={`text-black font-semibold ${sidebar ? "" : "hidden"}`} onClick={() => handleClick('/Setting')}>Setting</h1>
      </div>
      </div>
    </div>
  );
}



export default Sidebar;

