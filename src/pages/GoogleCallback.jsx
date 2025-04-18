import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';

function GoogleCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const name = params.get('name');
    const email = params.get('email');

    if (token && name && email) {
      const userData = { name, email, token };

      // เก็บข้อมูลใน localStorage
      localStorage.setItem('user', JSON.stringify(userData));

      // อัปเดต Redux state
      dispatch(loginSuccess(userData));

      // Redirect ไปยังหน้า Home
      navigate('/');
    }
  }, [location.search, navigate, dispatch]);

  return <div>Loading...</div>;
}

export default GoogleCallback;