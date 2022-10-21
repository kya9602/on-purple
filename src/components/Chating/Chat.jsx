import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { __getChatrooms } from "../../redux/modules/chatRoom";
import { useDispatch } from "react-redux";
import axios from "axios";
const Chat = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([
        {
            name: "안유진",
            message: "안녕~! ",
            timestamp: "35 분 전",
            profilePic: "https://post-phinf.pstatic.net/MjAyMDAzMDFfMTIx/MDAxNTgzMDQ5ODEzODc5.eLwaHPGkxYlj-RGPp5zE7Ghs__H9tYjvXaxdZehOo_cg.yopbH7--a4HJPuHxo_6-gx-gojvo0V0dqSgaem-d1mwg.JPEG/%EC%95%88%EC%9C%A0%EC%A7%842.JPG?type=w1200",
            roomId: 1,
        },
        {
            name: "이영지",
            message: "안녕하세요 ",
            timestamp: "55 분 전",
            profilePic: "https://cdn.huffingtonpost.kr/news/photo/202206/119191_233848.png",
            roomId: 2,
        }
    ])
    useEffect(() => {
        dispatch(__getChatrooms("1"));
        console.log("작동");
    }, []);
    
    
    /* const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        try {
          await axios.post(`${process.env.REACT_APP_HOST}/chat/rooms`,{}, {
            headers: {
              "Authorization": localStorage.getItem("Authorization"),
              "RefreshToken": localStorage.getItem("RefreshToken") 
            },
          });
          window.alert("😎생성😎");
        } catch (e) {
          // 서버에서 받은 에러 메시지 출력
          window.alert("오류발생!" + "😭");
        }
      }, []); */

    return (
        <div style={{ backgroundColor: "white", height: "100vh" }}>
            {data.map((userdata) => {
                return (
                    <ChatLink key={userdata.roomId} to={`/chat/${userdata.roomId}`} vlink="gray">
                        <ChatBox>
                            <ChatImg src={userdata.profilePic} />
                            <ChatDetails>
                                <ChatName>{userdata.name}</ChatName>
                                <ChatDetailsP>{userdata.message}</ChatDetailsP>
                            </ChatDetails>
                            <ChatTimeStamp>{userdata.timestamp}</ChatTimeStamp>
                        </ChatBox>
                    </ChatLink>
                )
            })}
            {/* <button onClick={handleSubmit}>생성</button> */}
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

const ChatLink = styled(Link)`
  text-decoration-line : none;
`