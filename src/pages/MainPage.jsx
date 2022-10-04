import styled from "@emotion/styled";
import React from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Deck from "../components/Main/Deck";
//import Test from "../components/Main/test";


const MainPage = () => {
    return (
        <MainPageContainer>
            <Header />
                <Deck />
            <Footer />
        </MainPageContainer>
    )
}

export default MainPage;

const MainPageContainer = styled.div`
    overscroll-behavior-y: contain;
    height: 100%;
    width: 100%;
    user-select: none;
    position: fixed;
    overflow: hidden;
`