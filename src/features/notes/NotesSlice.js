const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");


export const fetchNotes = createAsyncThunk("notes/fetchNotes", async (email) => {
    const res = await axios.get(`https://safe-springs-86418.herokuapp.com/all_notes/${email}`);
    console.log(res.data)
    return res.data;
})

export const addNote = createAsyncThunk("notes/addNote", async (data) => {
    const res = await axios.post('https://safe-springs-86418.herokuapp.com/new_note', data);
    // await axios.post('https://safe-springs-86418.herokuapp.com/new_note', data);
    console.log(res)
    console.log(res.data)
    return res.data;
})


export const updateNote = createAsyncThunk("notes/updateNote", async (data) => {
    const note = { title: data.newTitle, email: data.email, note: data.newNote, noteDate: data.updatedDate };
    console.log(note);
    const res = await axios.put(`https://safe-springs-86418.herokuapp.com/update_note/${data.id}`, note);
    console.log(res)
    // console.log(res.data)
    return res.data;
})


export const deleteNote = createAsyncThunk("notes/deleteNote", async (id, email) => {
    const res = await axios.delete(`https://safe-springs-86418.herokuapp.com/delete_note/${id}`, { email: email });
    console.log(res)
    console.log(res.data)
    return res.data;
})

const initialNotes = {
    isLoading: false,
    notes: [],
    error: null
};

export const noteSlice = createSlice({
    name: "notes",
    initialState: initialNotes,
    extraReducers: (builder) => {

        // Fetch notes
        builder.addCase(fetchNotes.pending, state => {
            state.isLoading = true;
        });
        builder.addCase(fetchNotes.fulfilled, (state, action) => {
            state.isLoading = false;
            state.notes = action.payload;
            state.error = null
            // console.log(state.notes)
            // console.log(action)
        });
        builder.addCase(fetchNotes.rejected, (state, action) => {
            state.isLoading = false;
            state.notes = [];
            // console.log(action)
            state.error = action.error.message
        });



        // Add note
        builder.addCase(addNote.pending, state => {
            state.isLoading = true;

        });
        builder.addCase(addNote.fulfilled, (state) => {
            state.isLoading = false;
            // state.notes = action.payload;
            // console.log(state.notes)
            // console.log(action)
        });
        builder.addCase(addNote.rejected, (state, action) => {
            state.isLoading = false;
            // state.notes = action.payload;
            // state.notes = [...state.notes];
            // console.log(action)
            state.error = action.error.message
        });



        // Update note
        builder.addCase(updateNote.pending, state => {
            state.isLoading = true
        });
        builder.addCase(updateNote.fulfilled, (state) => {
            state.isLoading = false;
            // state.notes = action.payload;
            console.log(state.notes)
            // console.log(action)
        });
        builder.addCase(updateNote.rejected, (state, action) => {
            state.isLoading = false;
            // state.notes = action.payload;
            // state.notes = [...state.notes];
            // console.log(action)
            state.error = action.error.message
        });



        // Delete note
        builder.addCase(deleteNote.pending, state => {
            state.isLoading = true;
        });
        builder.addCase(deleteNote.fulfilled, (state) => {
            state.isLoading = false;
            // state.notes = action.payload;           
            // console.log(state.notes)
            // console.log(action)
        });
        builder.addCase(deleteNote.rejected, (state, action) => {
            state.isLoading = false;
            // state.notes = [...state.notes];
            // console.log(action)
            state.error = action.error.message
        });
    }

})


export default noteSlice.reducer;