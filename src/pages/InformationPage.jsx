import React from "react";
import ChatHeader from "../components/Chating/ChatHeader";
import Information from "../components/Information/Information";
import styled from "styled-components";
import image from "../assets/images/moon.jpg"


const InformationPage = () => {
    return (
        <BackImage>
            <Container>
                <ChatHeader />
                <Information />
            </Container>
        </BackImage>
    )
}

export default InformationPage;

const Container = styled.div`
    max-width: 428px;
    width : 100%;
    margin:0 auto;
    height:100vh;
    background-color:white;
`
const BackImage = styled.div`
  background: url(${image});
  background-size: cover;
  height: 100vh;
`