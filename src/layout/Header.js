import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {Link, useNavigate} from 'react-router-dom'
import auth from '../firebase.init';

const Header = () => {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const handleLogout = () => {
        signOut(auth);
        navigate('/login');
    }
    console.log(user)
    return (
        <nav className='bg-slate-700 flex justify-around text-xl text-white font-medium py-3 sticky top-0 z-10'>
            <div>
                <Link to='/'>
                    <a className='italic text-3xl font-bold'>Note<span className='text-red-400'>Friend</span> </a>
                </Link>
            </div>
            <div className='flex justify-center items-center gap-10'>
                <Link to='/'>Home</Link>
                {/* <Link to='/notes-view'>All notes</Link> */}
                {
                    user?
                    <button onClick={handleLogout}>Log out</button> 
                    :
                    <Link to='/login'>Login</Link>
                }
                {
                    user && <h1 className='text-red-400'>{user?.displayName}</h1> 
                }
                
                
            </div>
                       
        </nav>
    );
};

export default Header;