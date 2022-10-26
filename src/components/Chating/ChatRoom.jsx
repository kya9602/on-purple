import React, { useEffect, useState, useRef, useCallback } from 'react'
import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom';
import ChatHeader from './ChatHeader';
import image from "../../assets/images/배경화면으로.jpg"
import { useDispatch } from "react-redux";


import SockJS from "sockjs-client";
import Stomp from "stompjs";

import ChatCard from './ChatCard';

function ChatRoom() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { roomId } = useParams();
    /* console.log(typeof roomId) */

    const [chatList, setChatList] = useState([]); // 웹소켓 연결 시 메시지 저장
    const [userData, setUserData] = useState({
      type: "",
      roomId: roomId,
      sender: "",
      message: "",
      createdAt: "",
    });

    useEffect(() => {
        let sock = new SockJS(process.env.REACT_APP_CHAT_SOCK);
        //1. SockJS를 내부에 들고있는 stomp를 내어줌
        let client = Stomp.over(sock);
        ws.current = client;
    }, []);

    useEffect(() => {
        wsConnect();
        return () => {
            wsDisConnect();
        }
    }, []);

    const ws = useRef();

    const token = localStorage.getItem("Authorization")
    const nickName = localStorage.getItem("nickname")
    //2. connection이 맺어지면 실행
    function wsConnect() {
        try {
            /* console.log(`소켓 연결을 시도합니다.`); */
            ws.current.debug = function (str) { /* console.log(str) */ };
            ws.current.debug();

            ws.current.connect({ Authorizaion: token, type: "TALK" }, () => {
                // connect 이후 subscribe
               /*  console.log('연결 성공') */
                //4. subscribe(path, callback)으로 메세지를 받을 수 있음
                ws.current.subscribe(`/sub/chat/room/${roomId}`, onMessageReceived );
                // 입장 시 enter 메시지 발신
                const message = {
                    type:"ENTER",
                    roomId: roomId,
                    sender: nickName,
                    message : `${nickName}님이 입장하셨습니다.`,
                    createdAt : userData.createdAt
                };
                //3. send(path, header, message)로 메세지를 보낼 수 있음
                ws.current.send(`/pub/chat/enter`, { Authorizaion : token } , JSON.stringify(message));
            });
        } catch (error) {
            console.log('ERROR')
        }
    }

    // 소켓 연결 해제
    
    function wsDisConnect() {
        try {
            ws.current.disconnect(() => {
                ws.current.unsubscribe("sub-0");
            });
        } catch (error) {
        }
    };

    // 웹소켓 메시지 송신
    const sendMessage = () => {
    if (ws.current && userData.message) {
      let chatMessage = {
        type: "TALK",
        roomId: roomId,
        sender: nickName,
        message: userData.message,
        createdAt : userData.createdAt
      };

      ws.current.send("/pub/chat/enter", { Authorizaion: token }, JSON.stringify(chatMessage));
      /* console.log(chatMessage) */
      setUserData({ ...userData, message: "" });
    }
    scrollToBottom();
};

    // 수신 메세지
    const onMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
        
        if (payloadData.type === "ENTER" || payloadData.type === "TALK") {
          chatList.push(payloadData);
          setChatList([...chatList]);
        }
        scrollToBottom();
      };

    const scrollToBottom = () => {
        window.document.body.querySelector("#chat-content")
        ?.scrollTo(0, document.body.querySelector("#chat-content").scrollHeight);
    };

    // Input Value
    const handleValue = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, message: value });
    };

    // Input Enterkey Event
    const onKeyPress = (event) => {
        if (event.key === "Enter") {
          sendMessage();
        }
      };
    
    return (
        <BackImage>
            <Container>
                {/* <ChatHeader roomId={roomId}/> */}
                         
                {chatList.map((item, idx)=>(
                    <ChatCard 
                            item={item}  
                            key={idx}
                            me={
                            item.sender === nickName
                            } 
                    >
                        {item.message}
                    </ChatCard>
                ))}    


                <ChatContainer>
                    <Input 
                        value={userData.message}
                        onChange={(event) => handleValue(event)}
                        onKeyDown={(event) => onKeyPress(event)}
                        placeholder="메세지를 입력하세요.."
                        type="text"
                    />
                    <InputButton onClick={sendMessage}>
                            전송
                    </InputButton>
                </ChatContainer>

            </Container>
        </BackImage>
    )
}

export default ChatRoom

const Container = styled.div`
    max-width: 428px;
    width: 100%;
    margin: 0 auto;
    height: 100%;
    background-color: white;
    overflow-y: scroll;
    &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(250, 213, 213, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(252, 112, 112, 0.3);
    border-radius: 6px;
  }
`
const BackImage = styled.div`
  background: url(${image});
  background-size: cover;
  height: 100vh;
`

const Input = styled.input`
    width: 73%;
    padding: 10px;
    border: 1px solid #D4B4FF;
    border-radius: 20px;
    
`

const InputButton = styled.button`    
    width: 70px;
    border: 1px solid #D4B4FF;
    border-radius: 20px;
    background-color: white;
    font-weight: bolder;
    cursor: pointer;
`

const ChatContainer = styled.div`
    display:flex;
    justify-content: space-between;
    background-color: white;
    padding: 10px;
    position: fixed;
    bottom: 0;
    max-width: 428px;
    width: 400px;
    border-top: 1px solid #D4B4FF;
    margin: 0 auto;
    z-index: 1;
`
