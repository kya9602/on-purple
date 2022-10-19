import React from "react";
import ChatHeader from "../components/Chating/ChatHeader";
import Report from "../components/Information/Report";
import styled from "styled-components";
import Header from "../components/Header/Header"
const ReportPage = () => {
    return (
        <Container>
            <Header/>
            <Report />
        </Container>
    )
}

export default ReportPage;

const Container = styled.div`
    max-width: 428px;
    width : 100%;
    margin:0 auto;
`