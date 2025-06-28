import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthCard = () => {
    return (
        <>
            <Outlet />
        </>
    );
};

export default AuthCard;