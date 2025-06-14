import {React,useContext} from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import { AdminContext } from './context/adminContext';
import { DoctorContext } from './context/DoctorContext';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';



const App = () => {

  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  console.log(aToken)

  return aToken || dToken ? (
    <div className='bg-[#F8F9FD'>
      <ToastContainer />
      <Navbar />
      
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/* admin route */}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-doctor' element={<AddDoctor />} />
          <Route path='/doctor-list' element={<DoctorsList />} />
          <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
          <Route path='/doctor-appointments' element={<DoctorAppointments />} />
          <Route path='/doctor-profile' element={<DoctorProfile />} />
          {/* doctor route */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
          <Route path='/doctor-appointments' element={<DoctorAppointments />} />
          <Route path='/doctor-profile' element={<DoctorProfile />} />
          {/* 404 page */}
          <Route path='*' element={<div className='w-full h-screen flex items-center justify-center text-2xl font-semibold'>404 Not Found</div>} />
        </Routes>
      </div>
    
    </div>
  ) : (
      <>
        <Login />
      <ToastContainer/>
      </>
    )
}

export default App;