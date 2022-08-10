import React from 'react';
import { Routes ,Route} from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Error from '../pages/Error';
import Home from '../pages/Home';
import NotesView from '../features/notes/NotesView';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import AllNotes from '../pages/AllNotes';
import ForgetPassword from '../pages/ForgetPassword';

const Index = () => {
    return (
        <div>
            <Header></Header>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/notes-view" element={<NotesView></NotesView>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/signup" element={<SignUp></SignUp>}></Route>
                <Route path="/all_notes" element={<AllNotes></AllNotes>}></Route>
                <Route path="/forget_password" element={<ForgetPassword></ForgetPassword>}></Route>
                <Route path="*" element={<Error></Error>}></Route>
            </Routes>
            <Footer></Footer>
        </div>
    );
};

export default Index;