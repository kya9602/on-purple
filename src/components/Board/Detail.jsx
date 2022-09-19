import React from "react";
import styled from "styled-components";
import CommentList from "./CommentList";
import Desc from "./Desc";

const Detail = () => {
    return (
        <>
            <Wrapper>
                <ImageContainer>
                </ImageContainer>
                <DescContainer>
                    <Desc/>
                </DescContainer>
            </Wrapper>
            <Review>
                <p>리뷰가 담길 공간 입니다</p>
            </Review>
            <CommentList/>
            
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
    margin-top: 50px;
`

const Review = styled.div`
     margin: 0 auto;
     border-top: 1px solid black;
     margin-top: 50px;
     text-align: center;
`