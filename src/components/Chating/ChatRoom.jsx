import React, { useEffect, useState, useRef, useCallback } from 'react'
import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom';
import ChatHeader from './ChatHeader';
import image from "../../assets/images/배경화면으로.jpg"
import { useDispatch, useSelector } from "react-redux";
import { __getlastMessage } from '../../redux/modules/chatRoom';

/* import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client"; */

import SockJS from "sockjs-client";
import Stomp from "stompjs";


function ChatRoom() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { roomId } = useParams();
    const [text, setText] = useState("")
    /* console.log(typeof roomId) */
    const messages = useSelector((state) => state.chatroom.lastmessage)

    console.log(messages)
    useEffect(() => {
        let sock = new SockJS(process.env.REACT_APP_CHAT_SOCK);
        //1. SockJS를 내부에 들고있는 stomp를 내어줌
        let client = Stomp.over(sock);
        ws.current = client;
        dispatch(__getlastMessage(roomId))
    }, []);

    useEffect(() => {
        wsConnect();
        return () => {
            wsDisConnect();
        }
    }, []);

    const ws = useRef();

    const token = localStorage.getItem("Authorization")

    //2. connection이 맺어지면 실행
    function wsConnect() {
        try {
            console.log(`소켓 연결을 시도합니다.`);
            ws.current.debug = function (str) { console.log(str) };
            ws.current.debug();

            ws.current.connect({ Authorizaion: token, type: "TALK" }, () => {
                // connect 이후 subscribe
                console.log('연결 성공')
                //4. subscribe(path, callback)으로 메세지를 받을 수 있음
                ws.current.subscribe(`/sub/chat/message`, (response) => {
                    const newMessage = JSON.parse(response.body);
                    console.log(newMessage)
                });
                // 입장 시 enter 메시지 발신
                const message = {
                    roomId: roomId,
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

    const onSend = async () => {
        try {
            //send할 데이터
            const message = {
                roomId: roomId,
                message: text,
            };

            if (text.trim() === "") {
                window.alert("메시지를 입력해주세요")
                return;
            }
            // send message
            ws.current.send("/pub/chat/enter", { Authorizaion: token }, JSON.stringify(message));
            setText("");
        } catch (error) {
        }
    };

    const onChangeChatHandler = useCallback((e) => {
        setText(e.target.value);
    }, []);

 /*    useEffect(() => {
        connect();
    
        return () => disconnect();
      }, []);
      const token = localStorage.getItem("Authorization")
      const client = useRef({});
      const connect = () => {
        client.current = new StompJs.Client({
          //websocket 주소만 입력 가능 * ws://, wss:// 로 시작
          // brokerURL: "ws://54.180.142.30/ws-stomp/websocket",
          brokerURL: "wss://sparta521.shop/stomp/chat/websocket",
          connectHeaders: {
            Authorization: token,
          },
          debug: function (str) {
            console.log(str);
          },
          reconnectDelay: 5000,
          heartbeatIncoming: 4000,
          heartbeatOutgoing: 4000,
          onConnect: () => {
            //구독요청
            subscribe();
            //입장 메시징(type0)
            client.current.publish({
              destination: "/pub/chat/enter",
              headers: { Authorization: token },
              //전송할 데이터를 입력
              body: JSON.stringify({
                type:"TALK",
                message: "1",
                roomId: roomId,
              }),
            });
            var heartbeat_msg = '--heartbeat--', heartbeat_interval = null;
            // missed_heartbeats = 0;
            if (heartbeat_interval === null) {
              // missed_heartbeats = 0;
              heartbeat_interval = setInterval(function() {
                  try {
                      // missed_heartbeats++;
                      // if (missed_heartbeats >= 6)
                          // throw new Error("Too many missed heartbeats.");
                      client.current.publish({                                     
                        destination: "/pub/chat/enter", 
                        headers: { Authorization: token },
                        //전송할 데이터를 입력
                        body: JSON.stringify({
                          type:"TALK",                        
                          message: heartbeat_msg,
                          roomId: roomId.id,
                          // userId:userId,
                        }),
                      });
                  } catch(e) {
                      clearInterval(heartbeat_interval);
                      // const heartbeat_interval = null;
                      // console.warn("Closing connection. Reason: " + e.message);
                      // console.log("짱많이 보냄")
                      // disconnect();
                  }
              }, 3000);
          }
          },
        });
        client.current.activate();
      };
      const subscribe = () => {
        client.current.subscribe(`/sub/chat/message`, function (chat) {
          const content = JSON.parse(chat.body);
           console.log(chat)
        });
      };
      const disconnect = () => {
        //퇴장메시징(type1)
        client.current.publish({
          destination: "/pub/chat/enter",
          headers: { Authorization: token },
          //전송할 데이터를 입력
          body: JSON.stringify({
            type: "TALK",
            message: "1",
            roomId: roomId,
          }),
        });
        //구독해제
        client.current.unsubscribe();
        //웹소켓 비활성화
        client.current.deactivate();
    
        navigate("/chat");
      }; */
    return (
        <BackImage>
            <Container>
                {/* <ChatHeader /> */}
                {/* <Screenbox>
                <MyMessage>안녕</MyMessage>
                <YouMessage>안녕</YouMessage>
                </Screenbox> */}
                <ChatContainer>
                    <Input /* value={text}
                        onChange={onChangeChatHandler} */
                        placeholder="메세지를 입력하세요..."
                        type="text"
                    />
                    <InputButton /* onClick={onSend} */>전송</InputButton>
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