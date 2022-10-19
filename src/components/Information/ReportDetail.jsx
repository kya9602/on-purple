import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { __getReportsDetail } from "../../redux/modules/report";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
const ReportDetail = () =>{
    const dispatch = useDispatch();
    const {reportId} = useParams();
    const { isLoading, error, detail } = useSelector((state) => state?.report);
    console.log(detail)
    
    useEffect(()=>{
        dispatch(__getReportsDetail(reportId))
    },[])
    
    if (isLoading) return "😴로딩중이에요..😴"

    if (error) {
        return <>{error.message}</>
    }

    return(
        <Container>
            <Title>{detail.title}</Title>
            <NicknameCategoryWrap>
                <TargetNickname>신고 대상 닉네임: <span>{detail.reportNickname}</span></TargetNickname>
                <Category>분류: <span>{detail.category}</span></Category>
            </NicknameCategoryWrap>
           
            <Img><img src={detail.imageUrl} alt=""/></Img>
    
            <Content>{detail.content}</Content>
        </Container>
    )
}

export default ReportDetail;

const Container = styled.div`
    margin-top: 100px;
    width: 100%;
`

const Title = styled.div`
    font-size: 30px;
    text-align: center;
`

const NicknameCategoryWrap = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: 20px;
    gap: 10px;
`
const TargetNickname = styled.div`
    font-size: 16px;
    span{
        font-weight: bold;
    }
`
const Category = styled.div`
    font-size: 16px;
    span{
        font-weight: bold;
    }
`

const Content = styled.div`
    margin:20px 10px auto 10px;
    font-size: 18px;
`

const Img = styled.div`
   margin-top: 30px;
   img{
    width: 100%;
    height: 400px;
   }
`

