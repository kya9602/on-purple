import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Chat= () =>{      
    const [data,setData] = useState([
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
    
    return(
        <div>
        {data.map((userdata)=>{
            return (
            <ChatLink key={userdata.roomId} to ={`/chat/${userdata.roomId}`} vlink="gray">
                <ChatBox>
                    <ChatImg src={userdata.profilePic}/>
                    <ChatDetails>
                        <ChatName>{userdata.name}</ChatName>
                        <ChatDetails_P>{userdata.message}</ChatDetails_P>
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

const ChatDetails_P = styled.p`
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