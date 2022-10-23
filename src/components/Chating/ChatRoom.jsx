import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom';
import ChatHeader from './ChatHeader';
import image from "../../assets/images/moon.jpg"
import { useDispatch, useSelector } from "react-redux";
import { __getlastMessage } from '../../redux/modules/chatRoom';

import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

/* import SockJS from "sockjs-client";
import Stomp from "stompjs"; */

import { subMessage } from '../../redux/modules/chatRoom';

function ChatRoom() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {roomId} = useParams();
    /* console.log(typeof roomId) */
    /* const data = useSelector((state) => state) */

// 일단 죽여  
/*     const ws = useRef();
    
    useEffect(() => {
        let sock = new SockJS(`http://3.34.196.38:8080/stomp/chat`);
        let client = Stomp.over(sock);
        ws.current = client;
        console.log(client)
        dispatch(__getlastMessage(roomId));
    }, []);
    
    useEffect(() => {
        connect();
        return () => {
            wsDisConnect();
        }
    }, []);

    function wsConnect() {
        try {
            console.log(`소켓 연결을 시도합니다.`);
            ws.current.debug = function (str) {console.log(str)};
            ws.current.debug();
            let token = localStorage.getItem("Authorization")

            // type: "CHAT"을 보내는 용도는 채팅방에 들어갈 때를 알기 위해서
            ws.current.connect({ Authorization : token, type: "TALK" }, () => {
                // connect 이후 subscribe
                console.log("연결 성공")
                ws.current.subscribe(`/sub/chat/message`, (response) => {
                    const newMessage = JSON.parse(response.body);
                    console.log(newMessage);
                });

                // 입장 시 enter 메시지 발신
                // 이 메시지를 기준으로 서버에서 unReadCount 판별
                const message = {
                    roomId: roomId,
                };
                ws.current.send(`/pub/chat/enter`, { Authorization: token }, JSON.stringify(message));
            });
        } catch (error) {
        }
    }

    // 소켓 연결 해제
    //, credentials: 'include'
    function wsDisConnect() {
        try {
            ws.current.disconnect(() => {
                ws.current.unsubscribe(roomId);
            });
        } catch (error) {
        }
    }
;
 */

// 다시 처음부터 시작
const client = useRef({});
const [chatMessages, setChatMessages] = useState([]);
const [message, setMessage] = useState("");

useEffect(() => {
  connect();

  return () => disconnect();
}, []);
let token = localStorage.getItem("Authorization")

const connect = () => {
  client.current = new StompJs.Client({
    // brokerURL: "ws://3.34.196.38:8080/stomp/chat", // 웹소켓 서버로 직접 접속
    webSocketFactory: () => new SockJS("http://3.34.196.38:8080/stomp/chat"), // proxy를 통한 접속
    connectHeaders: {
      user : 'login'
      
    },
    debug: function (str) {
      console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect: () => {
      subscribe();
    },
    onStompError: (frame) => {
      console.error(frame);
    },
  });

  client.current.activate();
};

const disconnect = () => {
  client.current.deactivate();
};

const subscribe = () => {
  client.current.subscribe(`/sub/chat/message`, ({ body }) => {
    setChatMessages((_chatMessages) => [..._chatMessages, JSON.parse(body)]);
  });
};

const publish = (message) => {
  if (!client.current.connected) {
    return;
  }

  client.current.publish({
    destination: "/pub/chat/enter",
    body: JSON.stringify({ message }),
  });

  setMessage("");
};

    return (
        <BackImage>
            <Container>
                {/* <ChatHeader /> */}
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