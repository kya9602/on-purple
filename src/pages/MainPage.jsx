import styled from "@emotion/styled";
import React from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Deck from "../components/Main/Deck";
import image from "../assets/images/배경화면으로.jpg"
import BrokenHeart from "../assets/icons/broken-heart.png"
import Heart from "../assets/icons/heart.png"
import TutorialButton from "../components/Main/TutorialButton";

const MainPage = () => {
    return (
        <BackImage>
            <MainPageContainer>
                <Header />
                <Deck />
                <HeartBox>
                    <Left>
                        <img src={BrokenHeart} alt=""/>
                        <span>UnPurple</span>
                    </Left>
                    <Right>
                        <img src={Heart} alt=""/>
                        <span>Purple</span>
                    </Right>
                </HeartBox>
                <Footer />
                <TutorialButton/>
            </MainPageContainer>
        </BackImage>

    )
}

export default MainPage;

const MainPageContainer = styled.div`
    max-width: 428px;
    width: 100%;
    user-select: none;
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
    color:#B7ABFF
  }
`
const Left = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  width: 50px;
  height: 50px;
  text-align: center;
  align-items: center;
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
  align-items: center;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`