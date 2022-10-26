import React from "react";

import styled from "styled-components";
import Header from "../components/Header/Header"
import image from "../assets/images/배경화면으로.jpg"
import GuideDeck from "../components/Main/GuideDeck";

import LeftArrow from "../assets/icons/Left-arrow.png"
import RightArrow from "../assets/icons/Right-arrow.png"
import TutorialButton from "../components/Main/TutorialButton";

function GuidePage() {
  return (
    <BackImage>
      <Container>
        <Header />
        <GuideDeck />
        <ArrowBox>
          <Left>
            <img src={LeftArrow} alt=""/>
          </Left>
           <span>카드를 좌우로 넘겨보세요 !</span> 
          <Right>
            <img src={RightArrow} alt=""/>
          </Right>
        </ArrowBox>
        <TutorialButton/>
      </Container>
    </BackImage>
  );
}

export default GuidePage;

const Container = styled.div`
    max-width: 428px;
    width : 100%;
    margin:0 auto;
    height: 100%;
    background-color: white;
`

const BackImage = styled.div`
  background: url(${image});
  background-size: cover;
  height: 100vh;
`

const ArrowBox = styled.div`
  width: 100%;
  height: 60px;
  margin-top: 80px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  span{
    font-size: 15px;
  }
`

const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 100px;
  height: 80px;
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
  width: 100px;
  height: 80px;
  text-align: center;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`