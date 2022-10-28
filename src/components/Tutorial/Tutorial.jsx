import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
// import required modules
import { Pagination } from "swiper";
import Guide1 from "../../assets/images/Guide 1.jpg"
import Guide2 from "../../assets/images/Guide2.jpg"
import Guide3 from "../../assets/images/Guide 3.jpg"
import Guide4 from "../../assets/images/Guide4.jpg"

function Tutorial() {
    const navigate = useNavigate();

    return (
        <>
            <Container>
                <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                    <SwiperSlide>
                        <Title><span>Home</span></Title>
                        <img src={Guide1} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Title><span>My Page</span></Title>
                        <img src={Guide2} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Title><span>Chat</span></Title>
                        <img src={Guide4} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Title><span>Board</span></Title>
                        <img src={Guide3} alt="" />
                    </SwiperSlide>

                </Swiper>
                <ButtonWrap>
                    <SignupButton onClick={() => { navigate('/signup'); }}>회원가입 하러가기 !</SignupButton>
                    <LoginButton onClick={() => { navigate('/login') }}>로그인 하러가기 !</LoginButton>
                </ButtonWrap>
            </Container>
        </>
    );
}

export default Tutorial;


const Title = styled.div`
    border: 1px solid #B7ABFF;
    border-radius: 20px;
    color: white;
    width: 200px;
    height: 30px;
    background-color: #B7ABFF;
`

const ButtonWrap = styled.div`
    width: 100%;
    margin-top: 10px;
    padding-bottom: 30px;
    display: flex;
    justify-content: space-evenly;
`

const SignupButton = styled.button`
    border: 2px solid #6e96ee;
    border-radius: 12px;
    padding: 0 10px 0 10px;
    color:white;
    background-color: #4097df;
    font-weight: 600;
    font-size: 15px;
    height: 40px;
    text-align: center;
    cursor: pointer;
    :hover{
        color:#4097df ;
        background-color : white; 
    }
`
const LoginButton = styled.button`
    border: 2px solid #6e96ee;
    border-radius: 12px;
    padding: 0 10px 0 10px;
    color:white;
    background-color: #4097df;
    font-weight: 600;
    font-size: 15px;
    height: 40px;
    text-align: center;
    cursor: pointer;
    :hover{
        color:#4097df ;
        background-color : white; 
    }
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
  font-size: 30px;
  background: #fff;
  display: flex;
  flex-direction:column;  
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
  margin-top: 30px;
  width:100%;
  height:46vh;
  object-fit: cover;
}

`
