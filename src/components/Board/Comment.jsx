import React from "react";
import styled from "styled-components";

const Commnent = ()=>{
    return(
        <>
            <p>유저이름</p>
            <CmContainer>
            <div>댓글댓글댓글댓글댓글</div>
            <div>💜숫자</div>
            </CmContainer>
        </>
    )
}

export default Commnent

const CmContainer = styled.div`
    display: flex;
    justify-content: space-between;
`