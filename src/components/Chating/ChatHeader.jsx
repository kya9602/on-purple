import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import report from "../../assets/icons/report.png"
import videoCall from "../../assets/icons/videochat.png"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const ChatHeader = (props) => {
    const session = props?.roomId
    const otherInfo = props?.data
const navigate = useNavigate();
    return (
        <ChatHeaderContainerDiv>
            <ChatBackbuttonDiv>
                <ArrowBackIosIcon style={{mariginBottom:"10px"}} fontSize="large" onClick={() => { navigate('/chat'); }}/>
            
            </ChatBackbuttonDiv>
            <ImgBox>
            <ProfileDetailImg
                            src={otherInfo?.otherImageUrl}
                            onClick={() => { 
                            navigate(`/profile/${otherInfo?.otherUserId}`);
                        }}/>
            <ProfileNicknameH3>{otherInfo?.otherUsername}</ProfileNicknameH3>
            </ImgBox>
            <ButtonWrap>
                <GoVideo onClick={() => 
                    { navigate(`/vchat/${session}`);
                    }} 
                    roomId={session}>
                    <img src={videoCall} alt=""/>    
                </GoVideo>
                <GoReport onClick={() => { navigate('/report'); }}><img src={report} alt=""/></GoReport>
            </ButtonWrap>
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
    align-items: center;
`

const ProfileDetailImg = styled.img`
    width: 50px;
    height: 50px; 
    border-radius: 70%;
    overflow: hidden;
    cursor: pointer;
`

const ChatBackbuttonDiv = styled.div`
    text-align: center;
    width: 50px;
    margin-top: 35px;
    height: 100%;
    cursor: pointer;
`


const ProfileNicknameH3 = styled.span`
    font-size: 18px;
    font-weight: bold;
    margin-top: auto;
    margin-bottom:auto;
`
const GoVideo = styled.div`
    cursor: pointer;
    img{
        width: 40px;
        height: 40px;
    }
`

const GoReport = styled.div`
    cursor: pointer;
    img{
        width: 40px;
        height: 40px;
    }
`
const ButtonWrap = styled.div`
    display: flex;
    justify-content: right;
    gap: 15px;
    margin-right: 5px;
`

const ImgBox = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`