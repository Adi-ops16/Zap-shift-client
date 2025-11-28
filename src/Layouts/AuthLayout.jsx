import React from 'react';
import { Outlet, useLocation } from 'react-router';
import Logo from '../Components/logo/Logo';
import loginAnimation from '../assets/animations/login.json'
import registrationAnimation from '../assets/animations/register.json'
import Lottie from 'lottie-react';


const AuthLayout = () => {
    const location = useLocation()

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
                {location.pathname === "/auth/login" ?
                    <Lottie
                        animationData={loginAnimation}
                        loop={true}
                    >
                    </Lottie>
                    :
                    <Lottie
                        animationData={registrationAnimation}
                        loop={true}
                    >
                    </Lottie>
                }
            </div>
        </div>
    );
};

export default AuthLayout;
