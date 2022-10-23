import React from "react";
import HomeGuide from "../components/Guide/HomeGuide";
import styled from "styled-components";
import Header from "../components/Header/Header"
import image from "../assets/images/배경화면으로.jpg"
import GuideDeck from "../components/Main/GuideDeck";
import GuideModal from "../components/Main/GuideModal";

function GuidePage() {
  return (

    <BackImage>
      <Container>
        <Header />
        {/* <HomeGuide /> */}
        <GuideDeck />
        <GuideModal />
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