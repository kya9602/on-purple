import React from "react";
import styled from "styled-components";
import Comment from "./Comment";
const CommentList = () => {
    return(
        <Container>
            <Comment/>
        </Container>
    )
}

export default CommentList;

const Container = styled.div`
    width: 1250px;
    height: 80%;
    margin: 0 auto;
    margin-top: 50px;
    border-top: 1px solid grey;
    
    ;
`