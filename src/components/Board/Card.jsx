import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const Card = ({item}) => {
    const navigate = useNavigate();
    return (
        <>
            <Item onClick={()=>{navigate(`/detail/${item.postId}`)}}>
                <Image src={item.imageUrl} alt="" />
                <TitleContentWrapper>
                    <Title>{item.title}</Title>
                    <Content>{item.content}</Content>   
                </TitleContentWrapper>
                <DescContainer>
                    <Writer>{item.nickname}</Writer>
                    <Like>💜{item.likes} 개</Like>
                </DescContainer>
                    <Date>{item.createdAt[0]}.{item.createdAt[1]}.{item.createdAt[2]}</Date>
            </Item>
        </>
    )
}

export default Card;

const Item = styled.div`
    border: 2px solid #9C7FCB;
    border-radius: 15px;
    width: 46%;
    height: 33vh;
    box-shadow:2px 2px 2px grey;
`

const Image = styled.img`
    border: 1px solid #d1b7fa;
    border-radius: 15px;
    width: 90%;
    height: 58%;
    margin-left: 2vw;
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