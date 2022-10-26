import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import VideoCallIcon from '@mui/icons-material/VideoCall';

const ChatHeader = (roomId) => {
    const session = roomId?.roomId
    const otherInfo = roomId?.data
    
const navigate = useNavigate();
    return (
        <ChatHeaderContainerDiv>
            <ChatHeaderLeftDiv>
                <ChatBackbuttonDiv>
                    <ArrowBackIosIcon fontSize="large" onClick={() => { navigate(-1); }}></ArrowBackIosIcon>
                </ChatBackbuttonDiv>
                <ProfileDetailImg
                    src={otherInfo?.otherImageUrl}
                    onClick={() => { 
                    navigate(`/profile/${otherInfo?.otherUserId}`);
                }}
                    
                ></ProfileDetailImg>
                <ProfileNicknameH3>{otherInfo?.otherUsername}</ProfileNicknameH3>
            </ChatHeaderLeftDiv>

            <ReportButtonDiv>
                <VideoCallIcon fontSize="large" onClick={() => 
                    { navigate(`/vchat/${session}`);
                    }} 
                    roomId={session}>
                    </VideoCallIcon>
                <ReportGmailerrorredIcon fontSize="large" onClick={() => { navigate('/information'); }}>신고하기icon</ReportGmailerrorredIcon>
            </ReportButtonDiv>

        </ChatHeaderContainerDiv>
    )
}

export default ChatHeader

const ChatHeaderContainerDiv = styled.div`
    display: flex;
    position: fixed;
    z-index: 3;
    background-color: white;
    max-width: 428px;
    width: 100%;
    height: 70px;
    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.3);
    justify-content: space-between;
`

const ProfileDetailImg = styled.img`
    width: 50px;
    height: 50px; 
    border-radius: 70%;
    overflow: hidden;
    margin-left: 15px;
    margin-top: auto;
    margin-bottom:auto;
    cursor: pointer;
`

const ReportButtonDiv = styled.div`
    text-decoration-line : none;
    margin-top: auto;
    margin-bottom:auto;
    margin-right: 15px;
    cursor: pointer;
`

const ChatHeaderLeftDiv = styled.div`
    display: flex;
    margin-top: auto;
    margin-bottom:auto;
`
const ChatBackbuttonDiv = styled.div`
    margin-top: 12px;
    margin-bottom:12px;
    margin-left: 10px;
    cursor: pointer;
`


const ProfileNicknameH3 = styled.h3`
    margin-top: auto;
    margin-bottom:auto;
`