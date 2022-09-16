import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import MypagePage from "../pages/MypagePage";
import ChatPage from "../pages/ChatPage";
import ProfilePage from "../pages/ProfilePage";
import BoardPage from "../pages/BoardPage";
import DetailPage from "../pages/DetailPage";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<MainPage />} />
                <Route path="/login" exact element={<LoginPage />} />
                <Route path="/signup" exact element={<SignUpPage />} />
                <Route path="/myPage" exact element={<MypagePage />} />
                <Route path="/chat" exact element={<ChatPage />} />
                <Route path="/profile" exact element={<ProfilePage />} />
                <Route path="/board" exact element={<BoardPage />} />
                <Route path="/detail" exact element={<DetailPage />} />
            </Routes>
        </BrowserRouter>

    );
}

export default Router;