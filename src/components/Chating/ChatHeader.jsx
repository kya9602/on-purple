import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const ChatHeader= ()=> {
    const navigate = useNavigate();
    return(
        <ChatHeaderContainerDiv>
            <ChatHeaderLeftDiv>
                <BackButton onClick={()=>{navigate('/chat');}}>뒤로가기</BackButton>
                <ProfileDetailImg
                src="https://post-phinf.pstatic.net/MjAyMDAzMDFfMTIx/MDAxNTgzMDQ5ODEzODc5.eLwaHPGkxYlj-RGPp5zE7Ghs__H9tYjvXaxdZehOo_cg.yopbH7--a4HJPuHxo_6-gx-gojvo0V0dqSgaem-d1mwg.JPEG/%EC%95%88%EC%9C%A0%EC%A7%842.JPG?type=w1200"
                onClick={()=>{navigate('/profile');}}
                ></ProfileDetailImg>
                <ProfileNicknameH3>닉네임</ProfileNicknameH3>
            </ChatHeaderLeftDiv>

            <ReportButton>신고하기icon</ReportButton>
        </ChatHeaderContainerDiv>
    )
}

export default ChatHeader

const ChatHeaderContainerDiv = styled.div`
    display: flex;
    position: fixed;
    top: 0px;
    background-color: white;
    width: 100%;
    height: 70px;
    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.3);
    justify-content: space-between;
`
const BackButton = styled.button`
    text-decoration-line : none;
`

const ProfileDetailImg = styled.img`
    width: 50px;
    height: 50px; 
    border-radius: 70%;
    overflow: hidden;
    margin-left: 15px;
    margin-top: auto;
    margin-bottom:auto;
`

const ReportButton = styled.button`
    text-decoration-line : none;
    margin-top: auto;
    margin-bottom:auto;
`

const ChatHeaderLeftDiv = styled.div`
    display: flex;
`

const ProfileNicknameH3 = styled.h3`
    margin-top: auto;
    margin-bottom:auto;
`