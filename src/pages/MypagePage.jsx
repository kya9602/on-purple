import React from "react";
import Mypage from "../components/Mypage/Mypage";
import Footer from "../components/Footer/Footer"
import styled from "styled-components";
import logo from "../assets/images/perple.jpg"
import Onlogo from "../assets/images/On 소문자.svg";
import Offlogo from "../assets/images/Off 소문자.svg";
import Header from "../components/Header/Header";
const MypagePage = () => {

  const token = localStorage.getItem('RefreshToken')

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
  margin:0 auto;
`
