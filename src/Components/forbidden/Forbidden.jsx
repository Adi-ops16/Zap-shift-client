import React from 'react';
import Error from '../../Pages/Error/Error';
import Lottie from 'lottie-react';
import errorAnimation from '../../assets/animations/error.json'
import { BsChevronLeft } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';

const Forbidden = () => {
    const navigate = useNavigate()
    return (
        <div className='my-10'>
            <h2 className='text-center text-4xl font-bold'>You are not authorized to go to this page</h2>
            <Lottie className='h-96' animationData={errorAnimation} loop={true}></Lottie>
            <div className='flex justify-center items-center gap-2'>
                <button
                    onClick={() => navigate(-1)}
                    className='btn btn-wide bg-primary text-black'>
                    <BsChevronLeft /> Go Back
                </button>
                <Link to="/" className='btn btn-wide bg-secondary text-white'>
                    <FaHome /> Go to Home
                </Link>
            </div>
        </div>
    );
};

export default Forbidden;