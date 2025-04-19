import React,{useContext} from 'react'

import { AppContext } from '../context/AppContext'

const MyAppointments = () => {
      const { doctors } = useContext(AppContext)
  
  return (
    <div>
      <p className='pb-3 mt-12 text-lg font-medium text-gray-600 border-b'>MyAppointments</p>

      <div className=''>
                {doctors.slice(0, 3).map((item, index) => (
                  <div
                    key={index}
                    className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b'>
                        <div>
                            <img className='w-36 bg-[#EAEFFF]' src={item.image} alt="" />
                        </div>
                        <div className='flex-1 text-sm text-[#5E5E5E]'>
                            <p className='text-[#262626] text-base font-semibold'>{item.name}</p>
                            <p>{item.speciality}</p>
                            <p className='text-[#464646] font-medium mt-1'>Address:</p>
                            <p className=''>{item.address.line1}</p>
                            <p className=''>{item.address.line2}</p>
                      <p className=' mt-1'><span className='text-sm text-[#3C3C3C] font-medium'>Date & Time:</span>
                        {/* {slotDateFormat(item.slotDate)} |  {item.slotTime} */}
                      </p>
                        </div>
                    </div>
                ))}
            </div>
    </div>
  )
};

export default MyAppointments