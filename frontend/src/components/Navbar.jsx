import React, { useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate  } from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate();
    //const [showMenu, setShowMenu] = useState(false);
    const [token, setToken] = useState(true);

    const logout = () => {
        //localStorage.removeItem('token')
        setToken(false)
        navigate('/login')
    };

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 '>
            <img src={assets.logo} alt='' />
            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to='/'>
                    <li className='py-1'>Home</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/doctors'>
                    <li className='py-1' > All Doctors</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/about'>
                    <li className='py-1'>About</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/contact'>
                    <li className='py-1'>Contact</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-4 '>
                {
                    token ?
                        <div className='flex items-center gap-2 cursor-pointer group relative'  >
                            <img className='w-8 rounded-full' src={assets.profile_pic} alt='profile pic' />
                            <img className='w-2.5' src={assets.dropdown_icon} alt='' />
                            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                                <div className='min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4'>
                                    <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                                    <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                                    <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                                </div>
                            </div>
                        </div >
                        : <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>
                            Create Account
                        </button>
                }
                
            </div>
        </div>
    )
};

export default Navbar