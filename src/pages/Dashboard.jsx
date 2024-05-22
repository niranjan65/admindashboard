import React from 'react'
import Sidebar from '../components/Sidebar'
import Home from '../components/Home'

const Dashboard = () => {
  return (
    <div className='h-screen flex overflow-hidden'>
      <div className=' md:w-[345px] border border-black flex-shrink-0'>
        <Sidebar />
      </div>
      <div className='h-full flex-1 overflow-y-auto'>
        <Home />
      </div>
    </div>
  )
}

export default Dashboard