import React from 'react';
import icon from '../../../assets/bookingIcon.png'
const HowItWorks = () => {

    const cardData = [
        {
            title: "Booking Pick & Drop",
            paragraph: "From personal packages to business shipments — we deliver on time, every time."
        },
        {
            title: "Cash On Delivery",
            paragraph: "From personal packages to business shipments — we deliver on time, every time."
        },
        {
            title: "Delivery Hub",
            paragraph: "From personal packages to business shipments — we deliver on time, every time."
        },
        {
            title: "Booking SME & Corporate",
            paragraph: "From personal packages to business shipments — we deliver on time, every time."
        },
    ]

    return (
        <div className='space-y-10 px-4 max-w-7xl mx-auto'>
            <h1 className='text-2xl font-extrabold text-secondary'>How it works</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-6 '>
                {
                    cardData.map((card, i) => {
                        return (
                            <div key={i} className='bg-white rounded-xl p-8 space-y-3'>
                                <img src={icon} alt="" />
                                <h2 className='text-secondary text-lg font-bold'>{card?.title}</h2>
                                <p className='text-base-content'>{card?.paragraph}</p>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default HowItWorks;