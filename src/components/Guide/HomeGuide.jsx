import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
// import required modules
import { Pagination } from "swiper";
import Guide1 from "../../assets/images/Guide1.jpg"

function HomeGuide() {
    const navigate = useNavigate();

    return (
        <>
            <Container>
            <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                    <SwiperSlide><img src={Guide1} alt=""/></SwiperSlide>
                    <SwiperSlide>Slide 2</SwiperSlide>
                    <SwiperSlide>Slide 3</SwiperSlide>
                    <SwiperSlide>Slide 4</SwiperSlide>
                    <SwiperSlide>Slide 5</SwiperSlide>
                </Swiper>
                <ButtonWrap>
                    <SignupButton onClick={() => { navigate('/signup'); }}>회원가입 하러가기 !</SignupButton>
                </ButtonWrap>
            </Container>
        </>
    );
}

export default HomeGuide;



const ButtonWrap = styled.div`
    padding-bottom: 10px;
`

const SignupButton = styled.button`
    border: 2px solid #6e96ee;
    color:white;
    background-color: #4097df;
    font-weight: 600;
    font-size: 15px;
    height: 40px;
    width: 300px;
    text-align: center;
    cursor: pointer;
`


const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height : 100%;
    background-color: white;

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 82%;
  object-fit: cover;
}

`
