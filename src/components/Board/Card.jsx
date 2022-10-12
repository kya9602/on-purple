import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import 'moment/locale/ko';
import { useState } from "react";
import Swal from "sweetalert2";


const Card = ({item}) => {
    const navigate = useNavigate();
    const nickname = localStorage.getItem("nickname")
    
    const moment = require('moment');
    const today = moment();
    /* console.log(today.format('YYYY-MM-DD, h:mm:ss')); */

  /*   function timeForToday(Day) {
        const today = new Date();
        const timeValue = new Date(Day);
        console.log(timeValue)
        const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
        if (betweenTime < 1) return '방금전';
        if (betweenTime < 60) {
            return `${betweenTime}분전`;
        }
        const betweenTimeHour = Math.floor(betweenTime / 60);
        if (betweenTimeHour < 24) {
            return `${betweenTimeHour}시간전`;
        }

        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay < 365) {
            return `${betweenTimeDay}일전`;
        }

        return `${Math.floor(betweenTimeDay / 365)}년전`;
    } */  
    
    // 게시글 상세보기 클릭시 로그인 유무 판단 후 2초뒤 로그인 페이지로 보냄
    const validation = ()=>{
        if(nickname == null){
            Swal.fire({title: '로그인이 필요합니다.😢'
                        , icon: 'error'})
            setTimeout(() => {
                (navigate('/login'))
            }, 2000);
        } else {
            navigate(`/detail/${item?.postId}`)
        }
    }
    return (
        <>
            <Item onClick={validation}>
                <Image src={item?.imageUrl} alt="" />
                
                <Container>
                    <Title>{item?.title}</Title>
                    <Content>{item?.content}</Content>                   
                    <Time>모먼트 적용예정</Time>
                    <WriterLikeWrapper>
                        <Writer>by <b>{item?.nickname}</b></Writer>
                        <Like>💜 {item?.likes}</Like>
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

const Image = styled.img` 
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
    display: flex;
    flex-direction: column;
`

const Writer = styled.div`
    margin-left: 10px;
`

const Like = styled.div`
    margin-right: 10px;
`

const Time = styled.div`
    margin: auto;
    margin-top: 10px;
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

const Modal = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #61dafb;
  text-align: left;
`