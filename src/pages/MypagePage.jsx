import React from "react";
import Mypage from "../components/Mypage/Mypage";
import Footer from "../components/Footer/Footer"
import styled from "styled-components";
import Header from "../components/Header/Header";
const MypagePage = () => {
  return (
    <Container> 
      <Header/>
      <Mypage />
      <Footer />
    </Container>
  );
}

export default MypagePage;

const Container = styled.div`
  max-width: 428px;
  width : 100%;
  margin: 0 auto;
`
