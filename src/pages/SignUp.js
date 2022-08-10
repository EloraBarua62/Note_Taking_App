import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import auth from '../firebase.init';
import { useAuthState, useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';

const SignUp = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [
        createUserWithEmailAndPassword,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [updateProfile, updating, updateerror] = useUpdateProfile(auth);
    const [user, loading, error] = useAuthState(auth);



    const onSubmit = async (data) => {
        const email = data.email;
        const password = data.password;
        const confirm_password = data.confirm_password;
        console.log(data)
        if (password === confirm_password) {
            console.log(data)
            await createUserWithEmailAndPassword(email, password);
            await updateProfile({ displayName: data.name });
            navigate('/');
        }
        else if (error) {
            setMessage(error.message)
        }
    }
    return (
        <div className='w-full h-full grid grid-cols-1 py-20'>
            <div className='w-2/3 md:w-1/2 lg:w-1/3 bg-slate-800 pt-10 mx-auto'>
                <h1 className='text-4xl font-bold text-amber-300 text-center'>Register</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col py-10'>
                    {/* <input type='text' {...register("name")} /> */}
                    <label htmlFor="" className='text-lg pl-5 font-semibold text-white'>Name</label>
                    <input placeholder='Your name' className='py-2 px-3 mt-1 mb-5 mx-4 border-2 rounded-xl' type='name' {...register("name")} />

                    <label htmlFor="" className='text-lg pl-5 font-semibold text-white'>Email</label>
                    <input placeholder='Email' className='py-2 px-3 mt-1 mb-5 mx-4 border-2 rounded-xl' type='email' {...register("email")} />

                    <label htmlFor="" className='text-lg pl-5 font-semibold text-white'>Password</label>
                    <input placeholder='*********' className='py-2 px-3 mt-1 mb-5 mx-4 border-2 rounded-xl' type='password' {...register("password")} />

                    <label htmlFor="" className='text-lg pl-5 font-semibold text-white'>Confirm password</label>
                    <input placeholder='*********' className='py-2 px-3 mt-1 mb-5 mx-4 border-2 rounded-xl' type='password' {...register("confirm_password")} />
                    {/* <input type='password' {...register("confirm_password")} />                */}
                    <input type="submit" className='font-bold py-2 px-3 my-6 mx-4 border-2 rounded-xl text-slate-800 bg-amber-400 hover:bg-amber-300 ' />

                    {
                        message && <p className='text-red-500 text-lg'>{message}</p>
                    }
                </form>
            </div>
            <div className='w-full mx-auto mt-16 mb-10'>
                <div className='mx-auto w-1/3 md:w-1/4 pt-1 bg-slate-800'></div>

            </div>
            <button onClick={() => navigate('/login')} className=' text-amber-500 text-2xl font-bold hover:text-slate-600'>Already have an account?</button>




        </div>



        // <div>
        //     <form onSubmit={handleSubmit(onSubmit)}>
        //         <input type='text' {...register("name")} />
        //         <input type='email' {...register("email")} />
        //         <input type='password' {...register("password")} />
        //         <input type='password' {...register("confirm_password")} />
        //         <input type="submit" />
        //     </form>

        //     {
        //         error && <p className='text-red text-lg'>{error.message}</p>
        //     }
        // </div>
    );
};

export default SignUp;