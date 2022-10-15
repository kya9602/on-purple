import React from "react";
import Footer from "../components/Footer/Footer";
import List from "../components/Board/List";
import Header from "../components/Header/Header"
import styled from "styled-components";
const Board = () => {

    return (
        <Wrapper>
            <Header/>
            <div style={{marginTop:"80px"}}>
            <List/>
            </div>
        </Wrapper>
    )
}


export default Board;

const Wrapper = styled.div`
    max-width: 428px;
    width : 100%;
    margin:0 auto;
`