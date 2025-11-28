import React from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import { Link, useNavigate } from 'react-router';
import Lottie from 'lottie-react';
import { BsChevronLeft } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import pageNotFoundAni from '../../assets/animations/error.json'

const Error = () => {
    const navigate = useNavigate()
    return (
        <div className='flex flex-col justify-center items-center'>

            <Navbar></Navbar>

            <div>

                <h2 className='text-center text-5xl text-secondary font-bold'>Page Not Found</h2>

                <Lottie
                    width={50}
                    height={50}
                    animationData={pageNotFoundAni}
                    loop={true}
                    className='h-96'
                    >
                </Lottie>

                <div className='flex gap-2'>
                    <button
                        onClick={() => navigate(-1)}
                        className='flex-1 btn btn-primary text-black'>
                        <BsChevronLeft />
                        Go Back
                    </button>

                    <Link to="/"
                        className='flex-1 btn btn-secondary text-white'>
                        <FaHome />
                        Go Home
                    </Link>
                </div>

            </div>

            <Footer></Footer>

        </div>
    );
};

export default Error;