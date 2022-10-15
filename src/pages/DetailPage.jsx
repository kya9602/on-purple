import React from "react";
import Detail from "../components/Board/Detail";
import Header from "../components/Header/Header";
import styled from "styled-components";
const DetailPage = () => {
    
    return (
        <Container>  
            <Header/>
            <Detail />
        </Container>
    )
}

export default DetailPage;

const Container = styled.div`
    max-width: 428px;
    width : 100%;
    margin:0 auto;
`