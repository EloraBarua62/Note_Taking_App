import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchNotes, updateNote } from './NotesSlice';

const NoteUpdate = ({update , setUpdate}) => {

    const [newTitle, setNewTitle] = useState(update.title);
    const [newNote, setNewNote] = useState(update.note);
    const newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    const updatedDate = date + '.' + month + '.' + year;


    const dispatch = useDispatch();
    useEffect(() => {
            dispatch(fetchNotes(update.email));
    }, [])
    
    
    
    const handleUpdate = event =>{
        event.preventDefault();
        const id = update.id;
        const email = update.email;
        dispatch(updateNote({id ,email , newTitle , newNote , updatedDate}));
        setUpdate({});
    } 
    return (
        <div>
            <input type="checkbox" id="update-modal" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box bg-slate-700 py-20">
                    <label for="update-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h1 className='text-2xl font-bold text-white text-center'>Update note</h1>
                    <form onSubmit={handleUpdate} className='flex flex-col'>
                        <label htmlFor="" className='text-white text-lg'>Title</label>
                        <input type="text" className='my-2 py-2 pl-2 rounded-lg text-xl font-semibold text-black border-2 border-slate-500'  value={newTitle} onChange={e => setNewTitle(e.target.value)}/>
                        <label htmlFor="" className='text-white text-lg'>Note</label>
                        <textarea className='my-2 py-2 pl-2 rounded-lg text-xl  text-black border-2 border-slate-500'  value={newNote} onChange={e => setNewNote(e.target.value)}></textarea>
                        <input type='submit' value='update' class="uppercase mt-5 px-3 py-2 w-36 bg-slate-400  rounded-lg text-lg font-bold border-2 hover:bg-slate-300"/>
                        {/* <div class="modal-action">
                            <input type='submit' class="btn uppercase mt-5 px-3 py-2 w-36 bg-slate-400  rounded-lg text-lg font-bold border-2 hover:bg-slate-300">update</input>
                        </div> */}
                        {/* <label for="update-modal"  value="submit" className='btn uppercase mt-5 px-3 py-2 w-36 bg-slate-400  rounded-lg text-lg font-bold border-2 hover:bg-slate-300 ' /> */}
                        {/* <button type='submit' className='uppercase mt-5 px-3 py-2 w-36 bg-slate-400  rounded-lg text-lg font-bold border-2 hover:bg-slate-300 '>Update</button> */}
                    </form>
                    {/* <h3 class="font-bold text-xl text-white">{update.title}</h3>
                    <p class="py-4   text-white">{update.note}</p>
                    <div class="modal-action">
                        <label for="view-modal" class="btn bg-white hover:bg-slate-200 text-black">Close</label>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default NoteUpdate;