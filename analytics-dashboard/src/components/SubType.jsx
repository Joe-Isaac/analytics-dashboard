import { Progress } from 'antd'
import React, {useEffect, useState} from 'react'
import { TrendingDown, TrendingUp, User } from 'react-feather'
// import { MdElectricCar } from 'react-icons/md'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SubType({type}) {
  
  const [currentColor, setCurrentColor] = useState("");


  useEffect(() => {
    if(type === "Animal"){
      setCurrentColor('#f9a825');
    }
    else if(type === "Person"){
      setCurrentColor('#1976d2');
    }
    else{
      setCurrentColor('#009c77');
    }
  
  }, [type]
  );
  return (
    <div className={`h-28 shadow-md rounded-lg flex justify-evenly items-center text-white font-mono`}
    style={{
      backgroundColor: currentColor,
    }}
    >
        <div className='flex-col'>
            
            { type === 'Person' ?
               (<div className='items-center flex'>
                {/* <FontAwesomeIcon icon="fa-solid fa-person" /> */}
                <p className='font-mono font-bold mx-4 text-lg text-white'>{type}</p>
                </div>)
                :
                type === 'Car' ? 
                <div className='items-center flex'>
                {/* <FontAwesomeIcon icon="fa-duotone fa-car" /> */}
                <p className='font-mono font-bold mx-4 text-lg text-white'>{type}</p>
                </div>
                :
                type === 'Animal' && 
                <div className='items-center flex'>
                {/* <FontAwesomeIcon icon="fa-solid fa-dog" /> */}
                <p className='font-mono font-bold mx-4 text-lg text-white'>{type}</p>
                </div>
              
            }
            <div>
                <Progress percent={50} showInfo={false} strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}/>
            </div>
        </div>
        <div className='flex items-center flex-col'>
            <div><TrendingUp size={23} color='green'/>
            <p className='text-white font-bold'>+4500</p></div>
            <div className='text-xs font-mono'>Last 1 month</div>
        </div>
        {/* <div className='flex items-center flex-col'>
            <div><TrendingDown size={23} color='red'/>
            <p className='text-red-600'>+4500</p></div>
            <div className='text-sm font-mono'>Last 1 month</div>
        </div> */}
     </div>
  )
}

export default SubType