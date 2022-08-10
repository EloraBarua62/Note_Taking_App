import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import auth from '../firebase.init';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';

const ForgetPassword = () => {
    const [sendPasswordResetEmail, sending,error] = useSendPasswordResetEmail(auth);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    

    if(sending){
        return <p className='text-blue-900'>Sending...</p>
    }

    if(error){
        return <p className='text-red-600'> {error.message}</p>
    }


    
    const onSubmit = async (data) => {
        const email = data.email;
        sendPasswordResetEmail(email);
        navigate('/')
    }
    return (
        <div className='w-full h-full flex justify-center py-20'>
            <div className='w-1/3 bg-slate-700 py-10'>
                <h1 className='py-10 text-4xl font-bold text-amber-500 text-center uppercase'>Reset Password</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col py-10 px-3'>
                    {/* <input type='text' {...register("name")} /> */}
                    <label htmlFor="" className='text-lg pl-3 font-bold text-white'>Email</label>
                    <input placeholder='Email' className='py-2 mb-3 mx-4 border-2 rounded-xl' type='email' {...register("email")} />
                
                    <input type="submit" value='Done' className='text-xl font-bold py-2 px-3 my-3 mx-4 border-2 rounded-xl text-white bg-slate-500 hover:bg-slate-600 ' />
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;
