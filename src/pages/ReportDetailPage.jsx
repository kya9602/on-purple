import React from "react";
import styled from "styled-components";
import ReportDetail from "../components/Information/ReportDetail";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer"

const ReportDetailPage = () =>{
    return(
    <Container>
        <Header/>
        <ReportDetail/>
        <Footer/>
    </Container>
    )
}

export default ReportDetailPage;

const Container = styled.div`
    max-width: 428px;
    width : 100%;
    margin:0 auto;
`