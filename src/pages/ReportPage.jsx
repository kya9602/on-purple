import React from "react";
import Report from "../components/Information/Report";
import styled from "styled-components";
import Header from "../components/Header/Header"
import image from "../assets/images/배경화면으로.jpg"
import Footer from "../components/Footer/Footer";

const ReportPage = () => {
    return (
        <BackImage>
            <Container>
                <Header />
                <Report />
                <Footer />
            </Container>
        </BackImage>

    )
}

export default ReportPage;

const Container = styled.div`
    max-width: 428px;
    width : 100%;
    margin:0 auto;
    @media all and (max-width : 390px) {
   max-width : 390px;
   }
`

const BackImage = styled.div`
background: url(${image});
background-size: cover;
height: 100vh;
`