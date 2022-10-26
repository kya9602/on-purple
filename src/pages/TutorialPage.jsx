import React from "react";
import styled from "styled-components";
import image from "../assets/images/배경화면으로.jpg"
import Header from "../components/Header/Header";
import Tutorial from "../components/Tutorial/Tutorial";
const TutorialPage = () =>{
    return(
        <BackImage>
            <Container>
            <Header/>
            <Tutorial/>    
            </Container>
        </BackImage>
    )
}

export default TutorialPage;

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