import React from 'react';
import userProfile from '../assets/ui/user-3-fill.png';
import menuLine from '../assets/ui/menu-line.png';
import { useNavigate } from 'react-router-dom';
import './navbar.css'

function Navbar({setSidebar}) {
    const navigate = useNavigate();
  
    const handleClick = (path) => {
      
      navigate(path, { replace: true });
    };
  
    return (
      <div className='navbar w-full h-20 flex justify-between items-center p-4'>
        <div className='left flex gap-4'>
           <img className='cursor-pointer filter invert' onClick={()=>setSidebar(prev =>!prev)} src={menuLine} alt="Menu" />
           <h1 className='text-white2 font-bold'>TaskForge</h1>
        </div>
        <div className="right flex gap-4">
          <img className='userProfileImg filter invert cursor-pointer' src={userProfile} alt="" onClick={() => handleClick('/username')} />
          <h1 className='cursor-pointer text-white2 font-bold' onClick={() => handleClick('/username')}>username</h1>
        </div>
      </div>
    );
  }
  
  export default Navbar;