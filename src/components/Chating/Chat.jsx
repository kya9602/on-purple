import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { __getChatrooms, __enterChatroom } from "../../redux/modules/chatRoom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Chat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector((state) => state?.chatroom?.chatroom)
    
    
    useEffect(() => {
        dispatch(__getChatrooms("1"));
       
    }, []);
    
    return (
        <div style={{ backgroundColor: "white", height: "100vh" }}>
            {data.map((userdata) => {
                return (
                    <ChatLink 
                              key={userdata.roomId} 
                              onClick={()=>{dispatch(__enterChatroom(userdata.roomId))
                              navigate(`/chat/${userdata.roomId}`)}} 
                              >
                        <ChatBox>
                            <ChatImg src={userdata.otherImageUrl} />
                            <ChatDetails>
                                <ChatName>{userdata.otherNickname}</ChatName>
                                <ChatDetailsP>{userdata.lastMessage}</ChatDetailsP>
                            </ChatDetails>
                            <ChatTimeStamp>{userdata.timestamp}</ChatTimeStamp>
                        </ChatBox>
                    </ChatLink>
                )
            })}
        </div>
    )
}

export default Chat;



const ChatBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    height: 70px;
    border-bottom: 1px solid rgb(236, 236, 236);
`
const ChatDetails = styled.div`
  flex: 1;
`

const ChatName = styled.h3`
  color:black;
`

const ChatDetailsP = styled.p`
   color: gray;
`

const ChatTimeStamp = styled.p`
   color: lightgray;
`

const ChatImg = styled.img`
    width: 50px;
    height: 50px; 
    border-radius: 70%;
    overflow: hidden;
    margin-right: 23px;
`

const ChatLink = styled.div`
  text-decoration-line : none;
`