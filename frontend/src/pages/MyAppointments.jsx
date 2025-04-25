import React,{useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {
  const { doctors, backendUrl, token } = useContext(AppContext);

    //const navigate = useNavigate()

    //const [appointments, setAppointments] = useState([])
    //const [payment, setPayment] = useState('')

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }
  
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
                            <p className=''>{item.address.street}</p>
                            <p className=''>{item.address.city}</p>
                      <p className=' mt-1'><span className='text-sm text-[#3C3C3C] font-medium'>Date & Time:</span>
                        {//slotDateFormat(item.slotDate)
                        //
                        } |  {item.slotTime}
                      </p>
                        </div>
                    </div>
                ))}
            </div>
    </div>
  )
};

export default MyAppointments