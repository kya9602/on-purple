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
            <div onClick={()=>{navigate(-1)}}>
                <MainContainer>
                    <img src={Return} alt=""/>
                </MainContainer>
            </div>
            <Link to="/" >
                <MainContainer>
                    <img src={Home} alt=""/>
                </MainContainer>
            </Link>
            <Link to="/board/taste">
                <MainContainer>
                    <img src={Dashboard} alt=""/>
                </MainContainer>
        </Link>
            <Link to="/chat" >
                <MainContainer>
                    <img src={Chating} alt=""/>
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
  width: 100%;
  height: 60px;
  justify-content: space-evenly;
    align-items:center;
  
  a:hover, a:active { text-decoration: none; }
  a { text-decoration: none; color: wheat; }
  a:visited { text-decoration: none; }
`

const MainContainer = styled.div `
    display: flex;
    width: 80px;
    justify-content: center;
    img{
        width: 50px;
    }
`