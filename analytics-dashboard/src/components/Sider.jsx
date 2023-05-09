import Modal from './Modal';
import React, { useState } from 'react'
import { Activity, BarChart, PieChart, TrendingUp, User } from 'react-feather'

function Sider() {
  const [progressModal, setProgressModal] = useState(false);
  return (
    <div className='md:w-1/5 sm:w-1/4 bg-[#161616] flex-col'>
        {/* Header */}
        <div className='flex justify-evenly h-28 border-b-gray-700 border-b-2 items-center'>
          <TrendingUp size={46} color='skyblue'/>
          <p className='text-white text-2xl font-bold font-sans'>Analytics</p>
        </div>
        {/* Body */}
        <div className='flex my-1 text-white h-14 justify-center items-center px-1 cursor-pointer'>
            <div className='flex items-center w-1/3 justify-self-center'><PieChart size={24} color='red'/></div>
            <p className='justify-self-end text'>Dashboard</p>
        </div>

        <div className='flex my-1 text-white h-14 justify-center items-center px-1 cursor-not-allowed' onClick={()=>setProgressModal(true)}>
            <div className='flex items-center w-1/3 justify-self-center'><BarChart size={24} color='green'/></div>
            <p className='justify-self-end text'>Overview</p>
        </div>

        <div className='flex my-1 text-white h-14 justify-center items-center px-1 cursor-not-allowed' onClick={()=>setProgressModal(true)}>
            <div className='flex items-center w-1/3'><Activity size={24} color='blue'/></div>
            <p className='justify-self-end text'>Activity</p>
        </div>

        <div className='flex my-1 text-white h-14 justify-center items-center px-1 cursor-not-allowed' onClick={()=>setProgressModal(true)}>
            <div className='flex items-center w-1/3 justify-self-center'><User size={24} color='gray'/></div>
            <p className='justify-self-end text'>My Team</p>
          </div>

          <Modal isOpen={progressModal}>
            <p className='text-white text-xl'>This feature is being built...</p>
            <div className='flex items-center justify-center '>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          onClick={()=>setProgressModal(false)}
        >
          Close
        </button>
        </div>
          </Modal>
        {/* Bottom */}
      </div>
  )
}

export default Sider