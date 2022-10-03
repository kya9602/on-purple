import React from "react";
import styled from "styled-components";

const Comments = ({comment})=>{
    
    return(
        <>
            <p>{comment.nickname}</p>
            <CmContainer>
            <div>{comment.comment}</div>
            <div>💜{comment.likes}</div>
            </CmContainer>
        </>
    )
}

export default Comments

const CmContainer = styled.div`
    display: flex;
    justify-content: space-between;
`