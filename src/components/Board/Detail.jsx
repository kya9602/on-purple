import React, {useEffect} from "react";
import styled from "styled-components";
import { useSelector, useDispatch  } from "react-redux";
import {  useParams } from "react-router";
import { __getPostsDetail } from "../../redux/modules/board";
import AddComment from "./AddComment"

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { Pagination } from "swiper";
import CommentList from "./CommentList";


const Detail = () => {
    const dispatch = useDispatch();
    const { isLoading , error, detail } = useSelector((state) => state.post);
    const {postId} = useParams();
    useEffect(() => {
        dispatch(__getPostsDetail(postId));
    }, [dispatch])
    if (isLoading) return "😴로딩중이에요..😴"

    if (error) {
        return <>{error.message}</>
    }

    return (
        <>
            <Title>{detail.title}</Title>
            <NameDateWrapper>
                <Name>{detail.nickname}</Name>
                <Date>{detail.createdAt[0]}-{detail.createdAt[1]}-{detail.createdAt[2]} </Date>
            </NameDateWrapper>
            <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                {detail.imgList.map((image, id)=> (
                       <SwiperSlide key={id}>
                        <ImgBox>
                            <img src={image} alt=""/>
                        </ImgBox>
                       </SwiperSlide>
                ))}
            </Swiper>
            <Likes>💜{detail.likes}개</Likes> 
            <Content>{detail.content}</Content>
            
            <div style={{marginTop:"10px"}}>
            <CommentList/>
            </div>
            <div style={{marginTop:"10px"}}>
            <AddComment detail={detail}/>
            </div>
        </>

    )
}

export default Detail;

const Title = styled.div`
    font-size: 8vw;
    text-align: center;
`
const Name = styled.div`
    font-size: 3vw;
    float: right;
`
const Date = styled.div`
    font-size: 3vw;
`
const NameDateWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

const Likes = styled.div`
    font-size: 4vw;
`

const Content = styled.div`
    margin: 0 auto;
    margin-top: 10px;
    width: 90%;
    height: 45vh;
    /* border: 1px solid #9E87BA; */
    font-size: 20px;
`

const ImgBox = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 3vw;
`