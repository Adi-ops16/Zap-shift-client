import React from 'react';
import Logo from '../../../Components/logo/Logo';
import { FaFacebook, FaLinkedin, FaX, FaYoutube } from 'react-icons/fa6';
import { Link } from 'react-router';

const Footer = () => {
    const links = <>
        <li><Link to="/">Services</Link></li>
        <li><Link to="/coverage">Coverage</Link></li>
        <li><Link to="/about">About us</Link></li>
        <li><Link to="/">Pricing</Link></li>
        <li><Link to="/">Blog</Link></li>
        <li><Link to="/">Contact</Link></li>
    </>

    return (
        <footer className="footer footer-horizontal gap-x-1 footer-center max-w-7xl mx-auto mt-20 p-10 text-white bg-black rounded-3xl">
            <aside>
                <Logo></Logo>
                <p className="font-bold">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                </p>
            </aside>
            <div className='border border-gray-800 border-dashed w-full'></div>
            <div>
                <ul className='flex gap-3'>{links}</ul>
            </div>
            <div className='border border-gray-800 border-dashed w-full'></div>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <Link className='text-xl'> <FaLinkedin></FaLinkedin> </Link>
                    <Link className='text-xl'> <FaX></FaX> </Link>
                    <Link className='text-xl'> <FaFacebook></FaFacebook> </Link>
                    <Link className='text-xl'> <FaYoutube></FaYoutube> </Link>
                </div>
            </nav>
            <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </footer>
    );
};

export default Footer;