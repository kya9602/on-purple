import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom';
import ChatHeader from './ChatHeader';
import image from "../../assets/images/moon.jpg"
import { useDispatch, useSelector } from "react-redux";
import { __getlastMessage } from '../../redux/modules/chatRoom';
import SockJS from "sockjs-client";
import Stomp from "stompjs";

function ChatRoom() {
    const dispatch = useDispatch();
    const {roomId} = useParams();
    console.log(typeof roomId)
    /* const data = useSelector((state) => state) */
    
    // 지난 메세지 가져오기
    useEffect(() => {
        dispatch(__getlastMessage(roomId));
        /* console.log("작동"); */
    }, [dispatch]);

    return (
        <BackImage>
            <Container>
                <ChatHeader />
                <ChatContainer>
                    <Input /* value={input}
                        onChange={(e) => setInput(e.target.value)} */
                        placeholder="메세지를 입력하세요..."
                        type="text"
                    />
                    <InputButton /* onClick={handleSend} */>전송</InputButton>
                </ChatContainer>

            </Container>
        </BackImage>
    )
}

export default ChatRoom

const BackImage = styled.div`
  background: url(${image});
  background-size: cover;
  height: 100vh;
`

const TimeStamp = styled.p`
    text-align:center;
    padding: 20px;
    color: gray;
`
const Screenbox = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
`

/* const ImgBox = styled.img`
    width: 40px;
    height: 40px; 
    border-radius: 70%;
    overflow: hidden;   
` */

const MyMessage = styled.p`
    margin-left: auto;
    background-color: #29b3cd;
    padding: 15px;
    border-radius: 20px;
    color: white;
`

const YouMessage = styled.p`
    background-color: lightgray;
    padding: 15px;
    border-radius: 20px;
`

const Input = styled.input`
    width: 60%;
    padding: 10px;
    border: none;
`

const InputButton = styled.button`    
    width: 100px;
    border: none;
    font-weight: bolder;
    color: #fe3d71;
    cursor: pointer;
`

const ChatContainer = styled.div`
    display:flex;
    justify-content: space-between;
    padding: 10px;
    position: fixed;
    bottom: 0;
    max-width: 428px;
    width: 400px;
    border-top: 1px solid lightgray;
    margin: 0 auto;
    gap:10px;
`
const Container = styled.div`
    max-width: 428px;
    width: 100%;
    margin: 0 auto;
    height: 100vh;
    background-color: white;
`