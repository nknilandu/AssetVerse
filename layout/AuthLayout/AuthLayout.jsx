import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
            <Outlet></Outlet>
            <Toaster/>
        </div>
    );
};

export default AuthLayout;