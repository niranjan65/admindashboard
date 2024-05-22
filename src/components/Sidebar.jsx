import React from 'react';
import { IoHomeOutline } from "react-icons/io5";
import bookpedia from '../images/bookpedia.png';
import { logout } from '../services/operations/authApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className='w-full flex flex-col h-full p-4 sm:p-3 md:p-4 lg:p-5'>
      <div className='w-full flex items-center justify-center mb-5 sm:mb-3 md:mb-4 lg:mb-5'>
        <img src={bookpedia} alt="Bookpedia Logo" className='w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/2' />
      </div>

      <ul className='w-full bg-[#e7e5fa] rounded-lg'>
        <div className='flex items-center justify-center gap-3 p-3 sm:p-2 md:p-3 rounded-xl'>
          <IoHomeOutline className='text-[#00008B] font-bold text-2xl' />
          <li className='h-10 text-xl text-[#00008B] font-semibold'>Home</li>
        </div>
      </ul>

      <button onClick={()=> dispatch(logout(navigate))} className='bg-blue-500 rounded-lg p-2 w-full mt-auto hover:bg-blue-600 transition-colors duration-200'>
        Log out
      </button>
    </div>
  );
}

export default Sidebar;
