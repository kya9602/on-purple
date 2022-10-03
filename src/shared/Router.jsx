import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
// import SignUpPage from "../pages/SignUpPage";
import MypagePage from "../pages/MypagePage";
import ChatPage from "../pages/ChatPage";
import ProfilePage from "../pages/ProfilePage";
import BoardPage from "../pages/BoardPage";
import DetailPage from "../pages/DetailPage";
import ChatScreen from "../components/Chating/ChatScreen";
import PostPage from "../pages/PostPage";
import InformationPage from "../pages/InformationPage";
import ReportPage from "../pages/ReportPage";
import EditPage from "../pages/EditPage";
// import SignupAdd from "../pages/SignupAdd";
import Oauth2Handler from "../components/Form/kakao/Oauth2Handeler";
import NewSignUpPage from "../pages/NewSignupPage";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<MainPage />} />
                <Route path="/login" exact element={<LoginPage />} />
                <Route path="/signup" exact element={<NewSignUpPage />} />
                <Route path="/myPage" exact element={<MypagePage />} />
                <Route path="/chat" exact element={<ChatPage />} />
                <Route path="/chat/:roomId" exact element={<ChatScreen />} />
                <Route path="/profile" exact element={<ProfilePage />} />
                <Route path="/board" exact element={<BoardPage />} />
                <Route path="/detail/:postId" exact element={<DetailPage />} />
                <Route path="/edit/:postId" exact element={<EditPage />} />
                <Route path="/post" exact element={<PostPage />} />
                <Route path="/information" exact element={<InformationPage />} />
                <Route path="/report" exact element={<ReportPage />} />
                <Route path="kakao" exact element={<Oauth2Handler />} />
            </Routes>
        </BrowserRouter>

    );
}

export default Router;