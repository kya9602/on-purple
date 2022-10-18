import React from "react";
import styled from "styled-components";
import ReportInfo from "../components/Information/ReportInfo";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer"
const ReportInfoPage = () =>{
    return(
        <Container>
            <Header/>
            <ReportInfo/>
            <Footer/>
        </Container>
    )
}

export default ReportInfoPage;

const Container = styled.div`
    max-width: 428px;
    width : 100%;
    margin:0 auto;
`