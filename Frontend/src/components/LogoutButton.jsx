// src/components/LogoutButton.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/reducers/authReducer';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';

const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        navigate('/login');
    };

    return <Button onClick={handleLogout}
    sx={{
        cursor: 'pointer',
    }}
    variant="text" 
>
    <LogoutIcon sx={{ mr: 1 }} />
    Çıkış
</Button>
};

export default LogoutButton;
