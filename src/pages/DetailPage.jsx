import React from "react";
import Detail from "../components/Board/Detail";
import Header from "../components/Header/Header";
import styled from "styled-components";
import image from "../assets/images/배경화면으로.jpg"


const DetailPage = () => {

    return (
        <BackImage>
            <Container>
                <Header />
                <Detail />
            </Container>
        </BackImage>
    )
}

export default DetailPage;

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