import React from "react";
import EditBoard from "../components/Board/EditBoard";
import image from "../assets/images/배경화면으로.jpg"
import styled from "styled-components";
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer";

const EditPage = () => {
    return (
        <BackImage>
            <Container>
                <Header />
                <EditBoard />
                <Footer />
            </Container>
        </BackImage>
    )
}

export default EditPage;

const Container = styled.div`
    max-width: 428px;
    width: 100%;
    margin: 0 auto;
`
const BackImage = styled.div`
  background: url(${image});
  background-size: cover;
  height: 100vh;
`