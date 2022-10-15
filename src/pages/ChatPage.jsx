import React from "react";
import Chat from "../components/Chating/Chat";
import Footer from "../components/Footer/Footer";
import styled from "styled-components";
const ChatPage = () => {
    return (
        <Container>
            <Chat />
            <Footer />
        </Container>

    )
}

export default ChatPage;

const Container = styled.div`
    max-width: 428px;
    width: 100%;
    margin: 0 auto;
`