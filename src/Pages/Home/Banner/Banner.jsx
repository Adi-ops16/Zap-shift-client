import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import banner1 from '../../../assets/banner/banner1.png';
import banner2 from '../../../assets/banner/banner2.png';
import banner3 from '../../../assets/banner/banner3.png';

import { FaLocationArrow } from 'react-icons/fa6';
import { Link } from 'react-router';

const Banner = () => {
    return (
        <div className='mb-24 max-w-7xl mx-auto'>
            <Carousel
                autoPlay
                showStatus={false}
                infiniteLoop
                renderThumbs={() => false}
            >
                <div className='relative'>
                    <img src={banner1} alt="Banner 1" className='w-full h-auto' />

                    <div
                        className="absolute -left-[20%] md:left-0 lg:left-[8%] bottom-[10%] scale-40 md:scale-80 lg:scale-100 xl:scale-125 flex gap-3 z-10">
                        <div className='flex items-center gap-2'>
                            <button
                                className='btn btn-primary border-none rounded-3xl text-secondary font-bold px-5 py-2 shadow-xl'>
                                Track your parcel
                            </button>
                            <span className='text-primary bg-secondary p-3 rounded-full shadow-md'>
                                <FaLocationArrow />
                            </span>
                        </div>

                        <Link to="/rider"
                            className='btn text-secondary bg-white rounded-xl px-5 py-2 shadow-xl w-fit'>
                            Be a Rider
                        </Link>
                    </div>
                </div>

                <div className='relative'>
                    <img src={banner2} alt="Banner 2" className='w-full h-auto' />

                    <div
                        className="absolute -left-[20%] md:left-0 lg:left-[8%] bottom-[10%] scale-40 md:scale-80 lg:scale-100 xl:scale-125 flex gap-3 z-10">
                        <div className='flex items-center gap-2'>
                            <button
                                className='btn btn-primary border-none rounded-3xl text-secondary font-bold px-5 py-2 shadow-xl'>
                                Track your parcel
                            </button>
                            <span className='text-primary bg-secondary p-3 rounded-full shadow-md'>
                                <FaLocationArrow />
                            </span>
                        </div>

                        <Link to="/rider"
                            className='btn text-secondary bg-white rounded-xl px-5 py-2 shadow-xl w-fit'>
                            Be a Rider
                        </Link>
                    </div>
                </div>

                <div className='relative'>
                    <img src={banner3} alt="Banner 3" className='w-full h-auto' />

                    <div
                        className="absolute -left-[20%] md:left-0 lg:left-[8%] bottom-[10%] scale-40 md:scale-80 lg:scale-100 xl:scale-125 flex gap-3 z-10">
                        <div className='flex items-center gap-2'>
                            <button
                                className='btn btn-primary border-none rounded-3xl text-secondary font-bold px-5 py-2 shadow-xl'>
                                Track your parcel
                            </button>
                            <span className='text-primary bg-secondary p-3 rounded-full shadow-md'>
                                <FaLocationArrow />
                            </span>
                        </div>

                        <Link to="/rider"
                            className='btn text-secondary bg-white rounded-xl px-5 py-2 shadow-xl w-fit'>
                            Be a Rider
                        </Link>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;
