import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const Card = ({item}) => {
    /* console.log(item.category) */
    const navigate = useNavigate();
    return (
        <>
            <Item onClick={()=>{navigate(`/detail/${item.postId}`)}}>
                <ImageDiv>
                    <Image src={item.imageUrl} alt="" />
                </ImageDiv>
                <Container>
                    <TitleContainer>
                        <Title>{item.title}</Title>
                        <Content>{item.content}</Content>  
                        <Date>{item.createdAt[0]}.{item.createdAt[1]}.{item.createdAt[2]}</Date>
                    </TitleContainer>
                    <WriterLikeWrapper>
                        <Writer>by <b>{item.nickname}</b></Writer>
                        <Like>💜 {item.likes}</Like>
                    </WriterLikeWrapper>

                </Container>                

            </Item>
        </>
    )
}

export default Card;

const Item = styled.div`
    max-width: 760px;
    border: 2px solid #9C7FCB;
    border-radius: 5px;
    width: 100%;
    height: 53vh;
    box-shadow:5px 5px 5px grey;
    margin : 0.7rem;
    margin-right: 18px;
    box-sizing: inherit;
`
const ImageDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Image = styled.img` 
    max-width: 50vh;
    max-height: 280px;
    height: 280px;
    width: 100%;
    height: 66%;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
`

const Title = styled.div`
    font-weight: bold;
    font-size: 20px;
    float: left;
    margin: 10px;
`

const Content = styled.div`
    float: left;
    margin-left: 10px;
`

const Container = styled.div`
    border-top: 1px solid #9C7FCB;
    margin-top: auto;
    display: flex;
    flex-direction: column;
`
const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    
`

const Writer = styled.div`
    margin-left: 10px;
`

const Like = styled.div`
    margin-right: 10px;
`

const Date = styled.div`
    margin: auto;
    margin-top: 30px;
    margin-left: 10px;
    margin-bottom: 10px;
`

const WriterLikeWrapper = styled.div`
    border-top: 1px solid #9C7FCB;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    -webkit-box-pack: justify;
    font-size: 0.8rem;
    padding-bottom: 10px;
`
