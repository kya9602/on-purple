import React from "react";
import ChatHeader from "../components/Chating/ChatHeader";
import Information from "../components/Information/Information";
import styled from "styled-components";
const InformationPage = () => {
    return (
        <Container>
            <ChatHeader />
            <Information />
        </Container>
    )
}

export default InformationPage;

const Container = styled.div`
    max-width: 428px;
    width : 100%;
    margin:0 auto;
`