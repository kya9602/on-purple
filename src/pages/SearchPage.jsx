import React from "react";
import styled from "styled-components";
import Header from "../components/Header/Header"
import image from "../assets/images/배경화면으로.jpg"
import Footer from "../components/Footer/Footer";
import Search from "../components/Board/Search/Search";

const SearchPage = () => {
    return (
        <BackImage>
            <Container>
                <Header />
                <Search />
                <Footer />
            </Container>
        </BackImage>
    )
}

export default SearchPage;

const Container = styled.div`
    max-width: 428px;
    width : 100%;
    margin:0 auto;
    background-color: white;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    @media all and (max-width : 390px) {
    max-width : 390px;
   }
`

const BackImage = styled.div`
background: url(${image});
background-size: cover;
height: 100%;
`