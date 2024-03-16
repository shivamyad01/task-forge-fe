import React from 'react'
import Sidebar from './Sidebar'


function home({sidebar}) {
  return (
    <div className='flex bg-gray-900'>
      <Sidebar sidebar={sidebar} />
      
    </div>
  )
}

export default home;