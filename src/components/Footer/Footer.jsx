import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ForumIcon from '@mui/icons-material/Forum';

const Footer = () =>{
    return(
        <FooterContainer>
            <Link to="/" >
                <MainContainer>
                    <HomeIcon fontSize="large" />
                </MainContainer>
            </Link>
            <Link to="/board">
                <MainContainer>
                    <DashboardIcon fontSize="large" />
                </MainContainer>
            </Link>
            <Link to="/chat" >
                <MainContainer>
                    <ForumIcon fontSize="large" />
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
  height: 70px;
  justify-content: space-evenly;
    align-items:center;
  
  a:hover, a:active { text-decoration: none; }
  a { text-decoration: none; color: black; }
  a:visited { text-decoration: none; }
`

const MainContainer = styled.div `
    display: flex;
    width: 80px;
    justify-content: center;
`