import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';
import NoteAdd from '../features/notes/NoteAdd';
import { fetchNotes } from '../features/notes/NotesSlice';
import NotesView from '../features/notes/NotesView';
import auth from '../firebase.init';
import Banner from './Section/Banner';

const Home = () => {
    // const [user] = useAuthState(auth);
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     if (user?.email) {
    //         const email = user.email
    //         dispatch(fetchNotes(email));
    //         // console.log(noteLists)
    //     }
    // },[dispatch,user])
    return (
        <div>
            <Banner></Banner>
            <div className='bg-rose-600 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                <div className='mx-auto py-20'>
                    <NoteAdd></NoteAdd>
                </div>

                <div className='xl:col-span-2'>
                    <NotesView></NotesView>
                </div>
            </div>

        </div>
        
    );
};

export default Home;