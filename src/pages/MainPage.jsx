import styled from "@emotion/styled";
import React from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Deck from "../components/Main/Deck";
import image from "../assets/images/배경화면으로.jpg"
import BrokenHeart from "../assets/icons/broken-heart.png"
import Heart from "../assets/icons/heart.png"
//import Test from "../components/Main/test";

const MainPage = () => {
    return (
        <BackImage>

            <MainPageContainer>
                <Header />
                <Deck />
                <HeartBox>
                    <Left>
                        <img src={BrokenHeart} alt=""/>
                        <span>UnLike</span>
                    </Left>
                    <Right>
                        <img src={Heart} alt=""/>
                        <span>Like</span>
                    </Right>
                </HeartBox>
                <Footer />
            </MainPageContainer>
        </BackImage>

    )
}

export default MainPage;

const MainPageContainer = styled.div`
    /* overscroll-behavior-y: contain; */
    max-width: 428px;
   /*  height: 100%; */
    width: 100%;
    user-select: none;
    

    /* 
    overflow-x: hidden;
    position: fixed;
     */
    margin: 0 auto;
    height: 100%;
    background-color: white;
`

const BackImage = styled.div`
    background: url(${image});
    background-size: cover;
    height: 100vh;

`

const HeartBox = styled.div`
  width: 100%;
  height: 60px;
  margin-top: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span{
    font-size: 15px;
  }
`
const Left = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  width: 50px;
  height: 50px;
  text-align: center;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Right = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 20px;
  width: 50px;
  height: 50px;
  text-align: center;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`