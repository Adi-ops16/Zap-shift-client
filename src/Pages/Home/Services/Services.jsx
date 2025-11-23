import React from 'react';
import serviceIMG from '../../../assets/service.png'
const Services = () => {
    const services = [
        {
            title: "Express  & Standard Delivery",
            para: "We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4-6 hours from pick-up to drop-off."
        },
        {
            title: "Nationwide Delivery",
            para: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours."
        },
        {
            title: "Fulfillment Solution",
            para: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support."
        },
        {
            title: "Cash on Home Delivery",
            para: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product."
        },
        {
            title: "Corporate Service / Contract In Logistics",
            para: "Customized corporate services which includes warehouse and inventory management support."
        },
        {
            title: "Parcel Return",
            para: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants."
        }
    ]
    return (
        <div className='my-10 p-5 md:my-20 md:p-20 rounded-xl bg-secondary max-w-11/12 mx-auto'>
            <div className='my-10 space-y-5 text-center'>
                <h1 className='text-4xl font-bold text-white'>Our services</h1>
                <p className='text-white'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    services.map((service, i) => {
                        return (
                            <div key={i} className='p-6 bg-white flex flex-col justify-center items-center text-center rounded-xl space-y-3'>
                                <img src={serviceIMG} alt="" />
                                <h2 className='text-secondary text-xl font-extrabold'>{service?.title}</h2>
                                <p className='text-base-content'>{service?.para}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Services;