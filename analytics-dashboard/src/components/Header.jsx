import dayjs from 'dayjs'
import React, { useState, useEffect } from 'react'
import { ChevronRight, LogOut } from 'react-feather';




function Header() {
  const [time, setTime] = useState(dayjs())

  const updateTime = () => {
    setTime(dayjs());
    window.requestAnimationFrame(updateTime);
  };

  useEffect(() => {
    window.requestAnimationFrame(updateTime);
    return () => {
      window.cancelAnimationFrame(updateTime);
    };
  }, []);

  return (
    <div className='w-full flex items-center justify-between px-8 font-mono'>
        <div className='flex-col'>
            <div className='text-2xl font-sans font-bold '>Hello</div>
            {/* <span class="bg-gradient-to-r text-2xl font-extrabold font-mono from-gray-200 to-green-500 text-transparent bg-clip-text">Hello Joey</span> */}
            <div className='flex'> 
              <div className='flex justify-center items-center'>
              <ChevronRight color='gray' size={10}/>
              <ChevronRight color='gray' size={10}/>
              </div>
              <p className='text-sm text-gray-500'>{time.format("YYYY-MM-DD HH:mm:ss")}</p>
          </div>
        </div>

        <div className='flex items-center hover:bg-green-500 rounded-lg h-8 w-24'>
        <p className='mx-2'>Logout</p>
          <LogOut color='white' size={20}/>
        </div>
    </div>
  )
}

export default Header