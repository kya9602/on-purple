import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
const ChatHeader = (roomId) => {
    console.log(roomId)
    const navigate = useNavigate();
    return (
        <ChatHeaderContainerDiv>
            <ChatHeaderLeftDiv>
                <ChatBackbuttonDiv>
                    <ArrowBackIosIcon fontSize="large" onClick={() => { navigate(-1); }}></ArrowBackIosIcon>
                </ChatBackbuttonDiv>
                <ProfileDetailImg
                    src="https://post-phinf.pstatic.net/MjAyMDAzMDFfMTIx/MDAxNTgzMDQ5ODEzODc5.eLwaHPGkxYlj-RGPp5zE7Ghs__H9tYjvXaxdZehOo_cg.yopbH7--a4HJPuHxo_6-gx-gojvo0V0dqSgaem-d1mwg.JPEG/%EC%95%88%EC%9C%A0%EC%A7%842.JPG?type=w1200"
                    onClick={() => { navigate('/profile'); }}
                ></ProfileDetailImg>
                <ProfileNicknameH3>닉네임</ProfileNicknameH3>
            </ChatHeaderLeftDiv>

            <ReportButtonDiv>
                <ReportGmailerrorredIcon fontSize="large" onClick={() => { navigate('/information'); }}>신고하기icon</ReportGmailerrorredIcon>
            </ReportButtonDiv>

        </ChatHeaderContainerDiv>
    )
}

export default ChatHeader

const ChatHeaderContainerDiv = styled.div`
    display: flex;
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