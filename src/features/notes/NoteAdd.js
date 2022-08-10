import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { addNote, fetchNotes } from './NotesSlice';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const NoteAdd = () => {
    const [user] = useAuthState(auth);
    const [note,setNote] = useState('');
    const [title, setTitle] = useState('Untitled Note');
    const newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    const dispatch = useDispatch();
    const noteDate = date + '.' + month + '.' + year;
    // console.log(noteDate)



    // useEffect(() => {
    //     if (user?.email) {
    //         const email = user.email
    //         dispatch(fetchNotes(email));
    //         // console.log(noteLists)
    //     }
    // }, [dispatch, user])


    const navigate = useNavigate();
    const handleNote = event =>{
        event.preventDefault();
        if(user?.email){
            const email = user.email;
            const data = { email ,title, note, noteDate }
            setTitle('Untitled Note');
            setNote('');
            // dispatch(fetchNotes(email))
            dispatch(addNote(data));
            
        }
        else{
            navigate('/login');
        }       
    }


    return (
        <div>
            <h1 className='text-3xl font-bold text-amber-200 text-center uppercase'>Create Note</h1>
            <div className='flex flex-col bg-amber-200 w-4/5 mx-auto border rounded-md mt-10'>

                <form onSubmit={handleNote} className='relative'>
                    <input type="text" className='bg-amber-200 my-3 pl-3 text-lg font-semibold placeholder:text-black' value={title} onChange={e => setTitle(e.target.value)}></input>
                    <textarea name="note" rows='10' id="note" value={note} onChange={e => setNote(e.target.value)} placeholder='Type here' className='bg-yellow-100 w-full pl-3 pt-3  placeholder:text-black'></textarea>
                    {/* <h1>Created on : {date}.{month}.{year}</h1> */}
                    <button type="submit" className='absolute bottom-5 left-3 text-lg py-1 px-3  rounded-lg font-semibold bg-white text-red-600 drop-shadow-lg'>Save</button>
                </form>
            </div>
        </div>
        
    );
};

export default NoteAdd;