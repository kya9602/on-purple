import React from "react";
import Chat from "../components/Chating/Chat";
import Footer from "../components/Footer/Footer";
import styled from "styled-components";
import image from "../assets/images/배경화면으로.jpg"

const ChatPage = () => {
    return (
        <BackImage>
            <Container>
                <Chat />
                <Footer />
            </Container>
        </BackImage>

    )
}

export default ChatPage;

const Container = styled.div`
    max-width: 428px;
    width: 100%;
    margin: 0 auto;
`
const BackImage = styled.div`
  background: url(${image});
  background-size: cover;
  height: 100vh;
`