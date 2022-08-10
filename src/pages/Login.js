import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import auth from '../firebase.init';
import {  useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

const Login = () => {
    const {register , handleSubmit} = useForm();
    const navigate = useNavigate();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    if (loading) {
        return <p className='text-blue-900'>Loading...</p>
    }

    if (error) {
        return (
            <div>
                <p className='text-red-500'>Error: {error.message}</p>
            </div>
        );
    }

    
    const onSubmit =  async data => {
        await signInWithEmailAndPassword(data.email, data.password);
        navigate('/');         
    }

   
    return (
        <div className='w-full h-full grid grid-cols-1 py-20'>
            <div className='w-2/3 md:w-1/2 lg:w-1/3 bg-slate-800 pt-10 mx-auto'>
                <h1 className='text-4xl font-bold text-amber-300 text-center'>Get Access</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col py-10'>
                    {/* <input type='text' {...register("name")} /> */}
                    <label htmlFor="" className='text-lg pl-5 font-semibold text-white'>Email</label>
                    <input placeholder='Your email' required className='py-2 px-3 mt-1 mb-5 mx-4 border-2 rounded-xl' type='email' {...register("email")} />
                    <label htmlFor="" className='text-lg pl-5 font-semibold text-white'>Password</label>
                    <input placeholder='Your password' className='py-2 px-3 mt-1 mb-5 mx-4 border-2 rounded-xl' type='password' {...register("password")} />
                    {/* <div className='flex'>
                        <input type="checkbox" name="" id="" />
                        <h1 className='text-xl font-bold text-white'>Forget Password</h1>
                    </div> */}
                    
                    {/* <input type='password' {...register("confirm_password")} />                */}
                    <input type="submit" value='Login' className='font-bold py-2 px-3 my-4 mx-4 border-2 rounded-xl text-slate-800 bg-amber-400 hover:bg-amber-300 ' />
                    
                     <Link to='/forget_password' className='text-center pl-4 mt-5 text-xl text-amber-200 hover:text-white'>Forget Password?</Link>
                </form>
                
                {/* {
                    error && <p className='text-red-500 text-lg'>{error.message}</p>
                } */}
            </div>
            <div className='w-full mx-auto mt-16 mb-10'>
                <div className='mx-auto w-1/3 md:w-1/4 pt-1 bg-slate-800'></div>
                
            </div>
            <button onClick={() => navigate('/signup')} className=' text-amber-500 text-2xl font-bold hover:text-slate-600'>New to NoteFriend?</button>
           
        </div>
    );
};

export default Login;