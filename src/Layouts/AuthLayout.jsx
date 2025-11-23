import React from 'react';
import { Outlet } from 'react-router';
import authImage from '../assets/authImage.png';
import Logo from '../Components/logo/Logo';

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className='flex flex-1 flex-col justify-center'>
                <div className='px-10 py-5'>
                    <Logo></Logo>
                </div>
                <div className="flex flex-1">
                    <div className="flex-1 flex justify-center items-center px-10">
                        <Outlet />
                    </div>
                </div>
            </div>
            <div className="hidden md:flex flex-1 bg-[#FAFDF0] justify-center items-center">
                <img
                    src={authImage}
                    className="w-3/4 max-w-md object-contain"
                />
            </div>
        </div>
    );
};

export default AuthLayout;
