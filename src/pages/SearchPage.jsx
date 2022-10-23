import React from "react";
import styled from "styled-components";
import Header from "../components/Header/Header"
import image from "../assets/images/moon.jpg"
import Footer from "../components/Footer/Footer";
import Search from "../components/Board/Search/Search";

const SearchPage = () =>{
    return (
        <BackImage>
            <Container>
                <Header />
                <Search/>
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
`

const BackImage = styled.div`
background: url(${image});
background-size: cover;
height: 100%;
`