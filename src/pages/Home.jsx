import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import {FaQuestionCircle, FaTicketAlt}
from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {login} from '../features/auth/authSlice'

function Home(){
    const location = useLocation();
    const navigate = useNavigate();
  
    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      const name = params.get('name');
      const email = params.get('email');
        const userData = {
            email,
            name,
            token
        }
      if (token && name && email) {
        localStorage.setItem('user',userData)
        localStorage.setItem('name', name);

        // Optional: เก็บ token ลง localStorage
        localStorage.setItem('token', token);

        navigate('/', { replace: true });
      }
    }, [location.search]);
    return(
        <>
            <section className='heading'>
                <h1>Vac Q: A Vaccine Booking System</h1>
                <p>Please choose from an option below</p>
            </section>
            <Link to='/new-ticket' className='btn btn-reverse btn-block'>
                <FaQuestionCircle />Create New Appointment
            </Link>
            <Link to='/tickets' className='btn btn-block'>
                <FaTicketAlt />View My Appointments
            </Link>
            <Link to='/tickets' className='btn btn-blue-500 btn-block'>
                <FaTicketAlt />View My Appointments
            </Link>
        </>
    )
}
export default Home;