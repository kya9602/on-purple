import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom';
import ChatHeader from './ChatHeader';

function ChatScreen() {
    const {id} = useParams();
    console.log(id)
    
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        {
            name:"안유진",
            image:"https://post-phinf.pstatic.net/MjAyMDAzMDFfMTIx/MDAxNTgzMDQ5ODEzODc5.eLwaHPGkxYlj-RGPp5zE7Ghs__H9tYjvXaxdZehOo_cg.yopbH7--a4HJPuHxo_6-gx-gojvo0V0dqSgaem-d1mwg.JPEG/%EC%95%88%EC%9C%A0%EC%A7%842.JPG?type=w1200",
            message:"와!",
        },
        {
            name:"안유진",
            image:"https://post-phinf.pstatic.net/MjAyMDAzMDFfMTIx/MDAxNTgzMDQ5ODEzODc5.eLwaHPGkxYlj-RGPp5zE7Ghs__H9tYjvXaxdZehOo_cg.yopbH7--a4HJPuHxo_6-gx-gojvo0V0dqSgaem-d1mwg.JPEG/%EC%95%88%EC%9C%A0%EC%A7%842.JPG?type=w1200",
            message:"안녕~!",
        },
        {            
            message:"번달 번줌 ?",
        }
    ])

    const handleSend = e => {
        e.preventDefault();
        setMessages([...messages, { message : input }]);
        setInput('');
    }


  return (
    <div>
        <ChatHeader />
        <TimeStamp>... 분 전에 매치 되었습니다.</TimeStamp>
        {messages.map((message,idx)=>(
        message.name?(
            <Screenbox>
                <YouMessage>{message.message}</YouMessage>
            </Screenbox>
        ):(
            <Screenbox>
                <MyMessage>{message.message}</MyMessage>
            </Screenbox>
        )
      ))}
      <ChatContainer>
            <Input value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메세지를 입력하세요..."
            type="text"
            />
            <InputButton onClick={handleSend}>전송</InputButton>
      </ChatContainer>
      
    </div>
  )
}

export default ChatScreen


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
    width: 100%;
    padding: 10px;
    border: none;
`

const InputButton = styled.button`    
    width: 60px;
    border: none;
    margin-right: 32px;
    background-color: white;
    font-weight: bolder;
    color: #fe3d71;
`

const ChatContainer = styled.div`
    display:flex;
    justify-content: space-between;
    padding: 10px;
    position: fixed;
    bottom: 0;
    width: 100%;
    border-top: 1px solid lightgray;
`