import React from "react";
import styled from "styled-components";

const Comments = ({comment})=>{
    console.log(comment)
    return(
        <div style={{margin:"10px"}}>
            <NickName>{comment.nickname}</NickName>
            
            <Container>
                <CM>{comment.comment}</CM>
                <div>💜 {comment.likes}</div>
            </Container>
            <TRWrapper>
                <Time>{comment.createdAt}</Time>
                <Recomment>답글 달기</Recomment>
            </TRWrapper>
        </div>
    )
}

export default Comments

const NickName = styled.p`
    font-size: 1rem;
    font-weight: bold;
`

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top:-10px;
   align-items: center;
`
const CM = styled.span`
    overflow: hidden;  		
    text-overflow: ellipsis;  
    white-space: nowrap; 		
    word-break:break-all;
    width: 300px;
    height: 20px;
    text-align: left;
`
const Time = styled.span`
    
`

const Recomment = styled.div`
    
`

const TRWrapper = styled.div`
    display: flex;
    gap: 10px;
`