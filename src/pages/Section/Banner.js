import React from 'react';
import banner_image from '../../images/Notebook-bro.png'

const Banner = () => {
    return (
        <div className='w-full bg-slate-900 grid grid-cols-1 md:grid-cols-2 px-20'>
            <div className='flex-col justify-center my-auto'>
                <h1 className='text-4xl font-bold text-red-500 mb-10'>Take Your Note</h1>
                <p className='text-2xl font-semibold text-white'>Make your day important,keep track of your decision,a piece of memory for future</p>
            </div>
            <div className='flex justify-center'>
                <img src={banner_image} alt="" />
            </div>
        </div>
    );
};

export default Banner;