import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Chating from "../../assets/icons/chating.png"
import Dashboard from "../../assets/icons/dashboard.png"
import Home from "../../assets/icons/home.png"
import Return from "../../assets/icons/return.png"

const Footer = () =>{
    const navigate = useNavigate();
    return(
        <FooterContainer>
            {/* <div onClick={()=>{navigate(-1)}}>
                <MainContainer>
                    <img src={Return} alt=""/>
                    <span>뒤로가기</span>
                </MainContainer>
            </div> */}
            <Link to="/board/taste">
                <MainContainer>
                    <img src={Dashboard} alt=""/>
                    <span>게시판</span>
                </MainContainer>
            </Link>
            <Link to="/" >
                <MainContainer>
                    <img src={Home} alt=""/>
                    <span>홈으로</span>
                </MainContainer>
            </Link>
            <Link to="/chat" >
                <MainContainer>
                    <img src={Chating} alt=""/>
                    <span>채팅</span>
                </MainContainer>
            </Link>
        </FooterContainer>
    )
}

export default Footer;
//BF80BF
const FooterContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 0px;
  background-color: white;
  border-top: 1px solid rgb(165, 165, 165);
  max-width: 428px;
  width: 100%;
  height: 60px;
  margin: auto;
  justify-content: space-evenly;
    align-items:center;
  
  a:hover, a:active { text-decoration: none; }
  a { text-decoration: none;}
  a:visited { text-decoration: none; }
`

const MainContainer = styled.div `
    display: flex;
    flex-direction: column;
    width: 80px;
    justify-content: center;
    img{
        width: 40px;
        margin: auto;
    }
    span{
        margin: auto;
    }
`