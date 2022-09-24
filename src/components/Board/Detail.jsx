import React from "react";
import styled from "styled-components";
import AddComment from "./AddComment";
import CommentList from "./CommentList";
import Desc from "./Desc";

const Detail = () => {
    return (
        <>
            <Wrapper>
                <Title><p>제목</p></Title>
                <ImageContainer>
                </ImageContainer>
                <DescContainer>
                    <Desc/>
                </DescContainer>
            </Wrapper>
            <CommentList/>
            <AddComment/>
             
        </>

    )
}

export default Detail;

const ImageContainer = styled.div`
    width: 500px;
    height: 600px;
    margin: 0 auto;
    border: 1px solid grey;
    border-radius: 15px;
`

const DescContainer = styled.div`
    width: 800px;
    height: 600px;
    margin: 0 auto;
    border: 1px solid grey;
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 50px;
`

const Review = styled.div`
     margin: 0 auto;
     border-top: 1px solid black;
     margin-top: 50px;
     text-align: center;
`
const Title = styled.div`
    margin: 0 auto;
    margin-top: 30px;
    box-shadow: 5px 5px 5px pink;
    border: 1px solid pink;
    border-radius: 30px;
    width: 300px;
    height: 30px;
    font-size: 15px;
    p{
       margin: 5px;
    }
    text-align: center;
`