import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, fetchNotes, updateNote, viewNotes } from './NotesSlice';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdManageSearch } from 'react-icons/md';
import NoteUpdate from './NoteUpdate';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const NotesView = () => {
    const [user] = useAuthState(auth);
    const noteLists = useSelector((state) => state.noteReducer.notes);
    const [noteObject, setNoteObject] = useState({});
    const [view, setView] = useState(false);
    const [update, setUpdate] = useState({});
    const navigate = useNavigate();
    const [change, setChange] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        if (user?.email || change) {
            const email = user.email
            dispatch(fetchNotes(email));
            setChange(false)
        }
    }, [dispatch, user, change])

    const handleView = (noteDetails) => {
        setView(true);
        setNoteObject(noteDetails);
    }

    const handleUpdate = (id,email,title,note) => {
        console.log(id);
        setUpdate({id,email,title,note})
        // dispatch(updateNote(id,noteDetails))
    }

    const handleDelete = (id,email) => {
        console.log(id)
        dispatch(deleteNote(id,email));
        setChange(true)
    }



    return (
        <div className='h-full bg-amber-200 mx-auto py-20'>
            <h1 className='text-center text-3xl font-bold text-slate-600 uppercase pb-10'>Recent notes</h1>
            <div className='grid grid-cols-1 xl:grid-cols-2 mb-20 gap-y-10'>
                {
                    noteLists && noteLists.slice(0,6).map(noteDetails => <div
                        className='text-white flex flex-col bg-slate-800 w-3/4 border-0 rounded-md shadow-2xl mx-auto'>
                        <h1 className=' my-3 pl-3 text-lg font-semibold'>{noteDetails.title} </h1>

                        <div className='w-full h-60 bg-slate-700 pl-3 overflow-y-auto'>
                            <p className='w-full py-10 text-lg mr-5'>{noteDetails.note}</p>
                            <p className='pb-10'>Created on : {noteDetails.noteDate}</p>
                            <label type="submit" onClick={() => handleView(noteDetails)} for="view-modal" className=' text-4xl font-semibold  pr-3'><MdManageSearch></MdManageSearch></label>
                            <label type="submit" onClick={() => handleUpdate(noteDetails._id,noteDetails.email, noteDetails.title, noteDetails.note)} for="update-modal" className=' text-2xl font-semibold  pr-3'><FaRegEdit></FaRegEdit></label>
                            <button type="submit" onClick={() => handleDelete(noteDetails._id, noteDetails.email)} className=' text-2xl font-semibold '><RiDeleteBin6Line></RiDeleteBin6Line></button>
                        </div>
                    </div>)
                }
            </div>

            {
                Object.keys(update).length!==0 && update.constructor === Object && <NoteUpdate update={update} setUpdate={setUpdate} setChange={setChange}></NoteUpdate>
            }

            {
                view && <div> 
                    <input type="checkbox" id="view-modal" class="modal-toggle" />
                    <div class="modal modal-bottom sm:modal-middle">
                        <div class="modal-box bg-slate-700">
                            <h3 class="font-bold text-xl text-white">{noteObject.title}</h3>
                            <p class="py-4   text-white">{noteObject.note}</p>
                            <div class="modal-action">
                                <label for="view-modal" class="btn bg-white hover:bg-slate-200 text-black">Close</label>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {
                user?.email && <Link to='/all_notes' className='text-3xl pr-10 font-bold text-amber-500 float-right'>See All</Link> 
            }
            
            
            
            {/* This is for passing props through Link */}
            {/* <Link to='/all_notes' state ={{noteLists : noteLists}} className='text-3xl pr-10 font-bold text-amber-300 float-right'>See All</Link> */}
            {/* <button onClick={()=>handleNavigate()} noteLists={noteLists}>Load More</button> */}
        </div>
    );
};

export default NotesView;
