import React from "react";
import styled from "styled-components";

import { useNavigate } from "react-router";
import { Button } from "@mui/material";

const Board = () => {
   
    const navigate = useNavigate();

    return (
        <>
            <Button variant="outlined" color="primary" onClick={()=>navigate("/post")} >글쓰기🖊️</Button>
            
            <NewPost>
                <p>New Post</p>
            </NewPost>
            <Container>
                
            </Container>

            <Matzip>
                <p>카테고리2</p>                
            </Matzip>
            <Container>
                
            </Container>

            <Review>
                <p>카테고리3</p>
            </Review>
            <Container>
                
            </Container>

            <Date>
                <p>카테고리4</p>
            </Date>
            <Container>
                
            </Container>

            <Like>
                <p>좋아요순</p>
            </Like>
            <Container>
                
            </Container>


        </>

    )
}


export default Board;


//글쓰기 버튼
/* const Write = styled.button`
    float: right;
` */

// 신규
const NewPost = styled.div`
    margin: 0 auto;
    margin-top: 30px;
    box-shadow: 5px 5px 5px pink;
    text-align: center;
    border: 1px solid pink;
    border-radius: 30px;
    
    width: 500px;
    height: 50px;
`

// 맛집 
const Matzip = styled.div`
    margin: 0 auto;
    box-shadow: 5px 5px 5px pink;
    text-align: center;
    border: 1px solid pink;
    border-radius: 30px;

    width: 500px;
    height: 50px;

`

// 후기 
const Review = styled.div`
    margin: 0 auto;
    text-align: center;
    border: 1px solid pink;
    border-radius: 30px;
    box-shadow: 5px 5px 5px pink;
    width: 500px;
`

// 데이트
const Date = styled.div`
    margin: 0 auto;
    text-align: center;
    border: 1px solid pink;
    border-radius: 30px;
    box-shadow: 5px 5px 5px pink;
    width: 500px;
`

// Like
const Like = styled.div`
    margin: 0 auto;
    text-align: center;
    border: 1px solid pink;
    border-radius: 30px;
    box-shadow: 5px 5px 5px pink;
    width: 500px;
`

const Container = styled.div`
    margin: 0 auto;
    margin-top:30px;
    margin-bottom: 30px;
    width: 1200px;
    height: 100%;
    border: 1px solid black;
    
`

