import React from "react";
import Mypage from "../components/Mypage/Mypage";
import Footer from "../components/Footer/Footer"
import styled from "styled-components";
import logo from "../assets/images/perple.jpg"
import Onlogo from "../assets/images/On 소문자.svg";
import Offlogo from "../assets/images/Off 소문자.svg";

const MypagePage = () => {

  const token = localStorage.getItem('RefreshToken')

  return (
    <>
      <HeaderContainer>
        {token === null ? <LogoImg><img src={Offlogo} alt="로그인 안된상태" /></LogoImg>
          : <LogoImg><img src={Onlogo} alt="로그인 된상태" /></LogoImg>}
        <Title>Purple</Title>
      </HeaderContainer>
      <Mypage />
      <Footer />
    </>
  );
}

export default MypagePage;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  top: 0px;
  /* background-color: gray; */
  width: 100%;
  height: 70px;
  ::after { 
    width: 100vw;
    height: 70px;
    content: "";
    background: url(${logo});
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    background-size: cover;}
`
const LogoImg = styled.div`
  box-shadow: 5px 5px 10px;
  margin-left: 10px;
  margin-top: 8px;
  height: 55px;
  filter: invert(91%) sepia(12%) saturate(205%) hue-rotate(248deg) brightness(103%) contrast(94%);
`

const Title = styled.div`
  font-size: 25px;
  font-weight:bolder;
  background: #f7e9f5;
  background: -webkit-linear-gradient(left, #420255, #f7e9f5);
  background:    -moz-linear-gradient(right, #420255, #f7e9f5);
  background:      -o-linear-gradient(right, #420255, #f7e9f5);
  background:         linear-gradient(to right, #420255, #f7e9f5);
  -webkit-background-clip: text;
          background-clip: text;
  color: transparent;
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 30%;
  @media all and (min-width : 750px) {
    margin-left: 40%;
    font-size: 40px;
  }
`
