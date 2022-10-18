import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination } from "swiper";


function HomeGuide() {
    const navigate = useNavigate();

    const DB = [
    {   
        pics:'https://cdn.magloft.com/github/swiper/images/page-001.jpg',
        H3:'Slide 1',
        H4:'회원가입 하기'
    },
    {
        pics:'https://cdn.magloft.com/github/swiper/images/page-002.jpg',
        H3:'Slide 2',
        H4:'내 정보 수정하기'
    },
    {
        pics:'https://cdn.magloft.com/github/swiper/images/page-003.jpg',
        H3:'Slide 3',
        H4:'보드 이용하기'
    },
    {
        pics:'https://cdn.magloft.com/github/swiper/images/page-004.jpg',
        H3:'Slide 4',
        H4:'채팅 하기'
    },
    {
        pics:'https://cdn.magloft.com/github/swiper/images/page-005.jpg',
        H3:'Slide 5',
        H4:'시작 하기'
    },
]

    return (
      <>
        <SwiperContainer>
            <Swiper
                slidesPerView={2}
                centeredSlides={true}
                spaceBetween={10}
                pagination={true}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {DB.map(data=>(
                    <SwiperSlide 
                        key={data.pics} >    
                        <img src={data.pics} />
                        <div>
                            <h3>{data.H3}</h3>
                            <h4>{data.H4}</h4>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <ButtonSet>
            <SignupButton onClick={()=>{navigate('/signup');}}>회원가입하기</SignupButton>
            <LoginButton onClick={()=>{navigate('/login');}}>로그인</LoginButton>
            </ButtonSet>
        </SwiperContainer>
      
      </>
    );
  }

export default HomeGuide;

const ButtonSet = styled.div`

`

const SignupButton = styled.button`
    margin-top: 2vh;
    border: 2px solid #6e96ee;
    background-color: white;
    border-radius: 10px;
    font-weight: 600;
    font-size: 12px;
    height: 30px;
    :hover{
    border: none;
    background-color: #4097df;
    color:white;
  }
`

const LoginButton = styled.button`
    margin-top: 2vh;
    margin-left: 1vh;
    border: 2px solid #6e96ee;
    background-color: white;
    border-radius: 10px;
    font-weight: 600;
    font-size: 12px;
    height: 30px;
    :hover{
    border: none;
    background-color: #4097df;
    color:white;
  }
`



const SwiperContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
.swiper {
}


.swiper-wrapper{
    max-width: 90%;
}


.swiper-slide {       
  width: 300px;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 18px;
  background: lightgray;
  border-radius: 15px;

  /* filter: brightness( ${(props)=> props.per || '30%' } ); */

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  
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
    flex:1;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  top: 0px;
  width: 100%;
  height: 30vh;
  object-fit: cover;
}
.swiper-slide div {
    max-width: 100%;
    height: 17vh;
}

.swiper-slide h4 {
    color:black;
}

.swiper {
    width: 100%;
    height: 70vh;
    margin-top:15vh;
  }



`
