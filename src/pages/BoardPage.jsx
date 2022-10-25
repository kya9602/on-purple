import React from "react";
import Footer from "../components/Footer/Footer";
import List from "../components/Board/List";
import Header from "../components/Header/Header"
import styled from "styled-components";
import image from "../assets/images/배경화면으로.jpg"

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

// 포스트 있을때 없을때 다름 .. (수정 요망)
const Wrapper = styled.div`
    background-color: white;
    max-width: 428px;
    width : 100%;
    margin:0 auto;
    height: 100%;
    overflow-y: scroll;
`

const BackImage = styled.div`
  background: url(${image});
  background-size: cover;
  height: 100vh;
`