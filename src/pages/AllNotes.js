import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NoteUpdate from '../features/notes/NoteUpdate';
import { deleteNote, fetchNotes } from '../features/notes/NotesSlice';
import { MdManageSearch } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const AllNotes = () => {
    // This is for geting props from Link using useLocation method
    // const location = useLocation();
    // const { noteLists } = location.state;
    

    const noteLists = useSelector((state) => state.noteReducer.notes);
    const [view, setView] = useState(false);
    const [update, setUpdate] = useState({});
    const [noteObject, setNoteObject] = useState({});
    const [searchTerm , setSearchTerm] = useState('');


    const [user] = useAuthState(auth);
    const dispatch = useDispatch();
    const [change , setChange] = useState(false);
    

    useEffect(() => {    
            if(change || user){
                console.log(user.email)
                dispatch(fetchNotes(user.email));
                setChange(false);
            }           
    }, [dispatch, user , change])

    
    // console.log(noteLists);

    const handleView = (noteDetails) => {
        setView(true);
        setNoteObject(noteDetails);
    }

    const handleUpdate = (id,email, title, note) => {
        console.log(id)
        setUpdate({ id,email, title, note })
        // dispatch(updateNote(id,noteDetails))
    }

    const handleDelete = (id,email) => {
        console.log(id)
        dispatch(deleteNote(id,email));
        setChange(true);
    }

    return (
        <div className='w-full h-full flex justify-center item-center bg-amber-400 py-20'>
            <div className='w-11/12'>
                <h1 className='text-center text-3xl font-bold text-slate-600 uppercase pb-10'>Recent notes</h1>
                <div className='w-full flex justify-center'>
                <input type="text" placeholder='Search your note...'  onChange={event => setSearchTerm(event.target.value)} className='my-10 border-2 rounded-md border-slate-500 py-2 pl-3 w-1/4'/>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                    {
                        noteLists && noteLists.filter((note) => {
                            if(searchTerm === ''){
                                return note
                            }
                            else if(note.title.toLowerCase().includes(searchTerm.toLowerCase())){
                                return note
                            }                          
                        })
                        .map(noteDetails => <div
                            className='bg-amber-200 w-3/4 border rounded-md shadow-2xl mx-auto'>
                            <h1 className='text-slate-700 my-3 pl-3 text-lg font-semibold'>{noteDetails.title} </h1>

                            <div className='w-full h-60 bg-amber-100 pl-3 text-slate-700 overflow-y-scroll '>
                                <p className='w-full py-10 text-lg'>{noteDetails.note}</p>
                                <p className='pb-10 font-semibold'>Created on : {noteDetails.noteDate}</p>
                                <label type="submit" onClick={() => handleView(noteDetails)} for="view-modal" className=' text-4xl font-semibold pr-3'><MdManageSearch></MdManageSearch></label>
                                <label type="submit" onClick={() => handleUpdate(noteDetails._id, noteDetails.email, noteDetails.title, noteDetails.note)} for="update-modal" className=' text-2xl font-semibold  pr-3'><FaRegEdit></FaRegEdit></label>
                                <button type="submit" onClick={() => handleDelete(noteDetails._id, noteDetails.email)} className=' text-2xl font-semibold '><RiDeleteBin6Line></RiDeleteBin6Line></button>
                            </div>
                        </div>)
                    }
                    {
                        Object.keys(update).length !== 0 && update.constructor === Object && <NoteUpdate update={update} setUpdate={setUpdate} setChange={setChange}></NoteUpdate>
                    }
                </div>

                

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
            </div>
        </div>
    );
};

export default AllNotes;