import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa6';

const ReviewCard = ({ review }) => {
    const { userName, user_photoURL, user_email, } = review || {}
    return (
        <div className='max-w-sm bg-white shadow-lg rounded-xl p-6 border border-gray-200'>
            <FaQuoteLeft className=' text-primary text-2xl mb-4'></FaQuoteLeft>

            <p className='text-base-content mb-4'>{review.review}</p>

            <div className='border-t border-dashed border-secondary my-4'></div>

            <div className='flex items-center gap-4'>
                <div className='w-10 h-10 rounded-full bg-primary'>
                    <img className='rounded-full' src={user_photoURL} />
                </div>

                <div>
                    <h3 className='text-lg font-semibold'>{userName}</h3>
                    <p className='text-sm text-base-content'>{user_email}</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;