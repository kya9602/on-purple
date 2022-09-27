import React from "react";
import styled from "styled-components";

const Card = () => {
    return (
        <>
            <Item>
                <Image>이미지 박스</Image>
                <TitleContentWrapper>
                    <Title>Title</Title>
                    <Content>Desc</Content>   
                </TitleContentWrapper>
                <DescContainer>
                    <Writer>작성자</Writer>
                    <Like>💜100</Like>
                </DescContainer>
                    <Date>yyyy.mm.dd</Date>
            </Item>
        </>
    )
}

export default Card;

const Item = styled.div`
    border: 2px solid #9C7FCB;
    border-radius: 15px;
    width: 46%;
    height: 30vh;
    box-shadow:2px 2px 2px grey;
`

const Image = styled.div`
    border: 1px solid #d1b7fa;
    border-radius: 15px;
    width: 90%;
    height: 58%;
    margin: 0 auto;
    margin-top: 1vw;
`

const Title = styled.div`
    font-size: 15px;
    font-weight: bold;
    float: left;
    margin: 10px;
`

const Content = styled.div`
    float: left;
    margin-left: 10px;
`

const TitleContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const DescContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Writer = styled.div`
    float: left;
    margin-left: 2vw;
    margin-top: 1vh;
`

const Like = styled.div`
    float: right;
    margin-right: 10px;
    margin-top: 1vh;
`

const Date = styled.div`
    float: right;
    margin-top: 0.5vh;
    margin-right: 2vw;
`