import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import List from "../components/Board/List";



const Board = () => {
    const settings = {
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
    };
    

    return (
        <>
            {/* <Write >글쓰기</Write> */}

            <NewPost>
                <p>New Post</p>
            </NewPost>
            <Container>
                <Slider {...settings}>
                  <List/>
                </Slider>
            </Container>

            <Matzip>
                <p>맛집 추천순</p>                
            </Matzip>
            <Container>
                <Slider {...settings}>
                    <List />
                </Slider>
            </Container>

            <Review>
                <p>후기 많은순</p>
            </Review>
            <Container>
                <Slider {...settings}>
                    <List />
                </Slider>
            </Container>

            <Date>
                <p>데이트 장소 추천순</p>
            </Date>
            <Container>
                <Slider {...settings}>
                    <List />
                </Slider>
            </Container>

            <Like>
                <p>좋아요순</p>
            </Like>
            <Container>
                <Slider {...settings}>
                    <List />
                </Slider>
            </Container>


        </>

    )
}


export default Board;


//글쓰기 버튼
/* const Write = styled.button`
    
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

