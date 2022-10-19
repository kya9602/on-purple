import React from "react";
import HomeGuide from "../components/Guide/HomeGuide";
import styled from "styled-components";
import Header from "../components/Header/Header"
import image from "../assets/images/moon.jpg"

function GuidePage() {
  return (

    <BackImage>
      <Container>
        <Header />
        <HomeGuide />
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
`

const BackImage = styled.div`
  background: url(${image});
  background-size: cover;
  height: 100vh;
`