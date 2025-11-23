import React from 'react';
import parcelTrack from '../../../assets/live-tracking.png'
import deliveryIMG from '../../../assets/safe-delivery.png'
const WhatWeProvide = () => {
    const cardData = [
        {
            title: "Live Parcel Tracking",
            para: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
            src: parcelTrack
        },
        {
            title: "100% Safe Delivery",
            para: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
            src: deliveryIMG
        },
        {
            title: "24/7 Call Center Support",
            para: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
            src: deliveryIMG
        }
    ]
    return (
        <div className='max-w-7xl mx-auto py-20 my-20 border-y border-secondary border-dashed'>
            {
                cardData.map((card, i) => {
                    return (
                        <div key={i} className='flex flex-col md:flex-row mx-4  items-center my-5 bg-white rounded-2xl py-4 px-8 gap-10'>
                            <figure>
                                <img src={card?.src} />
                            </figure>
                            <div className='space-y-3 pl-10 border-l border-dashed border-secondary'>
                                <h2 className='text-xl font-bold text-secondary'>{card?.title}</h2>
                                <p>{card?.para}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default WhatWeProvide;