import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

import amazon from '../../../assets/brands/amazon.png'
import amazonVector from '../../../assets/brands/amazon_vector.png'
import casio from '../../../assets/brands/casio.png'
import moonstar from '../../../assets/brands/moonstar.png'
import ranstad from '../../../assets/brands/randstad.png'
import star from '../../../assets/brands/star.png'
import starPeople from '../../../assets/brands/start_people.png'

const Brands = () => {
    const brandLogos = [amazon, amazonVector, casio, moonstar, ranstad, star, starPeople]
    return (
        <div className='max-w-7xl mx-auto'>
            <h1
                className='text-3xl font-extrabold text-secondary text-center mb-20'
            >We've helped thousands of sales teams</h1>
            <Swiper
                modules={[Autoplay]}
                slidesPerView={3}
                centeredSlides={true}
                spaceBetween={30}
                grabCursor={true}
                loop={true}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false
                }}
            >
                {
                    brandLogos.map((logo, i) => {
                        return (
                            <SwiperSlide key={i}>
                                <img src={logo} alt="" />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    );
};

export default Brands;