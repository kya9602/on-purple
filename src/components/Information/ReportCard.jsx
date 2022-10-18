import React from "react";
import styled from "styled-components";
const ReportCard = () => {
    return(
        <Container>
            <Image src="" alt=""/>
            <Title>제목입니당</Title>
            <Category>카테고리입니당</Category>
        </Container>
    )
}

export default ReportCard;

const Container = styled.div`
    display: flex;
    border: 1px solid gray;

`

const Image = styled.img`
    width: 100px;
    height: 100px;
    border: 1px solid gray;
    border-radius: 10px;
    margin: 5px auto;
`

const Title = styled.div`
    border-bottom: 1px solid gray;
    width: 150px;
`

const Category = styled.div`
    border-bottom: 1px solid gray;
    width: 150px;
`