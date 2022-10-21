import React from "react";
import styled from "styled-components";
import ReportDetail from "../components/Information/ReportDetail";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer"
import image from "../assets/images/moon.jpg"

const ReportDetailPage = () => {
    return (
        <BackImage>
            <Container>
                <Header />
                <ReportDetail />
                <Footer />
            </Container>
        </BackImage>
    )
}

export default ReportDetailPage;

const Container = styled.div`
    max-width: 428px;
    width : 100%;
    /* height: 100vh/; */
    margin:0 auto;
`
const BackImage = styled.div`
background: url(${image});
background-size: cover;
height: 100vh;
`