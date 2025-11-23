import React from 'react';
import error from '../../assets/error.png'
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <Navbar></Navbar>
            <div className='flex-1 flex flex-col justify-center'>
                <img src={error} alt="" />
                <Link to="/" className='btn btn-primary text-black'>Go Home</Link>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Error;