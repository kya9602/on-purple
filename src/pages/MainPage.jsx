import styled from "@emotion/styled";
import React from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Deck from "../components/Main/Deck";
import image from "../assets/images/moon.jpg"

//import Test from "../components/Main/test";

const MainPage = () => {
    return (
        <BackImage>

            <MainPageContainer>
                <Header />
                <Deck />
                <Footer />
            </MainPageContainer>
        </BackImage>

    )
}

export default MainPage;

const MainPageContainer = styled.div`
    /* overscroll-behavior-y: contain; */
    max-width: 428px;
   /*  height: 100%; */
    width: 100%;
    /* user-select: none;
    position: fixed;
    overflow: hidden; */
    margin: 0 auto;
    height: 100%;
    background-color: white;
`

const BackImage = styled.div`
    background: url(${image});
    background-size: cover;
    height: 100vh;

`