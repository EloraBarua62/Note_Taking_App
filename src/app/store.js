import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "../features/notes/NotesSlice";

const store =  configureStore({
    reducer : {
        noteReducer: noteReducer
    }});

export default store;