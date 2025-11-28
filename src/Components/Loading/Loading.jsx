import Lottie from 'lottie-react';
import React from 'react';
import loadingAnimation from '../../assets/animations/loading.json'

const Loading = () => {
    return (
        <div className='min-h-[calc(100vh-200px)] flex justify-center items-center'>
            <Lottie animationData={loadingAnimation} loop={true}></Lottie>
        </div>
    );
};

export default Loading;