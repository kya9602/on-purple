import React from "react";
import HomeGuide from "../components/Guide/HomeGuide";
import styled from "styled-components";
import Header from "../components/Header/Header"
function GuidePage() {
    return (
      <Container>
        <Header/>
        <HomeGuide />
      </Container>
    );
  }

export default GuidePage;

const Container = styled.div`
    max-width: 428px;
    width : 100%;
    margin:0 auto;
`