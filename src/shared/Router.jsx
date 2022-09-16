import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "../pages/Main";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Mypage from "../pages/Mypage";
import Chat from "../pages/Chat";
import Profile from "../pages/Profile";
import Board from "../pages/Board";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/signup" exact element={<SignUp />} />
                <Route path="/myPage" exact element={<Mypage />} />
                <Route path="/chat" exact element={<Chat />} />
                <Route path="/profile" exact element={<Profile />} />
                <Route path="/board" exact element={<Board />} />
            </Routes>
        </BrowserRouter>

    );
}

export default Router;