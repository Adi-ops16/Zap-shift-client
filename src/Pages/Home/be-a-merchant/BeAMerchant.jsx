import React from 'react';
import merchant from '../../../assets/location-merchant.png'
import merchantBg from '../../../assets/be-a-merchant-bg.png'
const BeAMerchant = () => {
    return (
        <div
            className="max-w-7xl mx-auto bg-secondary p-5 md:p-20 rounded-xl my-10 bg-no-repeat  bg-top"
            style={{ backgroundImage: `url(${merchantBg})` }}
        >
            <div
                className="flex flex-col-reverse md:flex-row gap-10 justify-between">
                <div className='md:w-1/2 flex flex-col justify-center space-y-5'>
                    <div>
                        <h1 className='text-2xl font-bold text-white mb-3'>Merchant and Customer Satisfaction is Our First Priority</h1>
                        <p className='text-[#DADADA]'>We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.</p>
                    </div>
                    <div className='flex flex-col md:flex-row gap-5'>
                        <button className='btn btn-md border-none bg-primary shadow-none text-black rounded-4xl'>Become a Merchant</button>
                        <button className='btn btn-md border-primary shadow-none bg-inherit text-primary rounded-4xl'>Earn with ZapShift Courier</button>
                    </div>
                </div>
                <figure className='md:w-1/2'>
                    <img src={merchant} alt="" />
                </figure>
            </div>
        </div>
    );
};

export default BeAMerchant;