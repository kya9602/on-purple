import React from "react";
import Footer from "../components/Footer/Footer";
import List from "../components/Board/List";
import Header from "../components/Header/Header"
import styled from "styled-components";
import image from "../assets/images/moon.jpg"

const Board = () => {

    return (
        <BackImage>
            <Wrapper>
                <Header />
                <div style={{ paddingTop: "35px" }}>
                    <List />
                </div>
                <Footer />
            </Wrapper>
        </BackImage>

    )
}


export default Board;

const Wrapper = styled.div`
    background-color: white;
    max-width: 428px;
    width : 100%;
    margin:0 auto;
    height: 100%;

`

const BackImage = styled.div`
  background: url(${image});
  background-size: cover;
  height: 100vh;
`