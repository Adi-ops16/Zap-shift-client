import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';
import Services from '../Services/Services';
import Brands from '../Brands/Brands';
import WhatWeProvide from '../WhatWeProvide/WhatWeProvide';
import Reviews from '../Reviews/Reviews';
import FAQ from '../FAQ/FAQ';
import BeAMerchant from '../be-a-merchant/BeAMerchant';

const reviewsPromise = fetch('/reviews.json').then(res => res.json())


const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <Services></Services>
            <Brands></Brands>
            <WhatWeProvide></WhatWeProvide>
            <BeAMerchant></BeAMerchant>
            <Reviews reviewsPromise={reviewsPromise}></Reviews>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;