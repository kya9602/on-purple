import React from "react";
import styled from "styled-components";
const ChatCard = ({item}) =>{
    /* console.log(item) */
    return(
        <>
        <Sender>{item.sender}</Sender>
        <Message>{item.message}</Message>
        </>
    )
}

export default ChatCard;

const Message = styled.div`
    width: 100px;
    height: 30px;
    
`

const Sender = styled.div`
    width: 100px;
    height: 30px;
`