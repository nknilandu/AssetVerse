import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
            <p>auth</p>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;