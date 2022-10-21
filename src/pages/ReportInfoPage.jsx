import React from "react";
import styled from "styled-components";
import ReportInfo from "../components/Information/ReportInfo";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer"
import image from "../assets/images/moon.jpg"

const ReportInfoPage = () => {
    return (
        <BackImage>

            <Container>
                <Header />
                <ReportInfo />
                <Footer />
            </Container>
        </BackImage>

    )
}

export default ReportInfoPage;

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