import { createContext,useState} from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();


const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [docData, setDocData] = useState(null);
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '');
    const [docAppointments, setDocAppointments] = useState([]);
    const [docDashData, setDocDashData] = useState(null);
    const [profileData, setProfileData] = useState(null);


    const getAllAppointments = async () => {

        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/appointments', { headers: { dToken } })
            if (data.success) {
                setDocAppointments(data.appointments.reverse())
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    // Function to Mark appointment completed using API
    const completeAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/doctor/complete-appointment', { appointmentId }, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
                // Later after creating getDashData Function
                getDashData()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    
        // Function to cancel doctor appointment using API
        const cancelAppointment = async (appointmentId) => {
    
            try {
    
                const { data } = await axios.post(backendUrl + '/api/doctor/cancel-appointment', { appointmentId }, { headers: { dToken } })
    
                if (data.success) {
                    toast.success(data.message)
                    getAllAppointments()
                    // after creating dashboard
                    getDashData()
                } else {
                    toast.error(data.message)
                }
    
            } catch (error) {
                toast.error(error.message)
                console.log(error)
            }
    
    }

        // Getting Doctor dashboard data using API
    const getDashData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/doctor/dashboard', { headers: { dToken } })

            if (data.success) {
                setDocDashData(data.dashData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

        // Getting Doctor profile data from Database using API
    const getProfileData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/doctor/profile', { headers: { dToken } })
            console.log(data.profileData)
            setProfileData(data.profileData)

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    const value = {
        docData,
        setDocData,
        dToken,
        setDToken,
        backendUrl,
        getAllAppointments,
        docAppointments,
        completeAppointment,
        cancelAppointment,
        getDashData,
        docDashData,
        getProfileData,
        profileData,
        setProfileData,
        


    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
};
    
export default DoctorContextProvider


