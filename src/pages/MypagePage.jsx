import React from "react";
import Mypage from "../components/Mypage/Mypage";
import Footer from "../components/Footer/Footer"
import styled from "styled-components";
import Header from "../components/Header/Header";
import image from "../assets/images/moon.jpg"

const MypagePage = () => {
  return (
    <BackImage>
      <Container>
        <Header />
        <Mypage />
        <Footer />
      </Container>
    </BackImage>
  );
}

export default MypagePage;

const Container = styled.div`
  max-width: 428px;
  width : 100%;
  margin: 0 auto;
  height: 100%;
`
const BackImage = styled.div`
  background: url(${image});
  background-size: cover;
  height:100vh;
`