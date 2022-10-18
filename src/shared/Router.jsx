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
import GuidePage from "../pages/GuidePage";
import EditPage from "../pages/EditPage";
// import Oauth2Handler from "../components/Form/kakao/Oauth2Handeler";
import KakaoAddPage from "../pages/KakaoAddPage";
import NewSignup from "../pages/NewSignuploadPage";
import VChatPage from "../pages/VChatPage";
import ReportInfoPage from "../pages/ReportInfoPage";
import ReportDetailPage from "../pages/ReportDetailPage";
const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<MainPage />} />
                <Route path="/login" exact element={<LoginPage />} />
                <Route path="/signup" exact element={<NewSignup />} />
                <Route path="/kakaoAddSignup" exact element={<KakaoAddPage />} />
                <Route path="/myPage/:profileId" exact element={<MypagePage />} />
                <Route path="/chat" exact element={<ChatPage />} />
                <Route path="/chat/:roomId" exact element={<ChatScreen />} />
                <Route path="/profile" exact element={<ProfilePage />} />
                <Route path="/board/:Category" exact element={<BoardPage />} />
                <Route path="/detail/:postId" exact element={<DetailPage />} />
                <Route path="/edit/:postId" exact element={<EditPage />} />
                <Route path="/post" exact element={<PostPage />} />
                <Route path="/information" exact element={<InformationPage />} />
                <Route path="/report" exact element={<ReportPage />} />
                <Route path="/guide" exact element={<GuidePage />} />
                <Route path="/vchat" exact element={<VChatPage />} />
                <Route path="/reportInfo" exact element={<ReportInfoPage />} />
                <Route path="/reportDetail/:reportId" exact element={<ReportDetailPage />} />
                {/* <Route path="/kakao" exact element={<Oauth2Handler />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default Router;