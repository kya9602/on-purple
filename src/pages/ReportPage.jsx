import React from "react";
import Report from "../components/Information/Report";
import styled from "styled-components";
import Header from "../components/Header/Header"
import image from "../assets/images/moon.jpg"
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
`

const BackImage = styled.div`
background: url(${image});
background-size: cover;
height: 100vh;
`