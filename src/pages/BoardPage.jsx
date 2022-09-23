import React from "react";
import styled from "styled-components";

import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import Footer from "../components/Footer/Footer";

const Board = () => {
   //Carousel 잠정 보류 해두겠습니다.
    /*  const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 4,
        nextArrow: (
            <NextTo>
              <img src="src\assets\icons\angle-left.png" alt="이전화살표" />
            </NextTo>
          ),
          prevArrow: (
            <Pre>
              <img src="src\assets\icons\angle-right.png" alt="다음화살표" />
            </Pre>
          ),
    }; */
    
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
                <p>실제 사용자들의 맛집 추천!</p>                
            </Matzip>
            <Container>
                
            </Container>

            <Review>
                <p>후기 많은순</p>
            </Review>
            <Container>
                
            </Container>

            <Date>
                <p>데이트 장소 추천순</p>
            </Date>
            <Container>
                
            </Container>

            <Like>
                <p>좋아요순</p>
            </Like>
            <Container>
                
            </Container>
            <Footer />

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

const Pre = styled.button`
  width: 30px;
  height: 30px;
  position: absolute;
  left: 3%;
  z-index: 3;
`;

const NextTo = styled.button`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 3%;
  z-index: 3;
`;

