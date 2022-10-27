import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { __getReportsDetail } from "../../redux/modules/report";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const ReportDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { reportId } = useParams();
    const { isLoading, error, detail } = useSelector((state) => state?.report);


    useEffect(() => {
        dispatch(__getReportsDetail(reportId))
    }, [])

    if (isLoading) return "😴로딩중이에요..😴"

    if (error) {
        return <>{error.message}</>
    }

    return (
        <Container>
            <Btnbox>
                <ArrowBackIosIcon className="BackBtn" fontSize="large" onClick={() => { navigate(-1); }}></ArrowBackIosIcon>
            </Btnbox>
            <Title>{detail.title}</Title>
            <NicknameCategoryWrap>
                <TargetNickname>신고 대상 닉네임: <span>{detail.reportNickname}</span></TargetNickname>
                <Category>분류: <span>{detail.category}</span></Category>
            </NicknameCategoryWrap>

            <Img><img src={detail.imageUrl} alt="" /></Img>

            <Content>{detail.content}</Content>
        </Container>
    )
}

export default ReportDetail;

const Container = styled.div`
    padding-top: 100px;
    width: 100%;
    height: 87vh;
    background-color:white;
    .BackBtn{
     cursor: pointer;   
    }
`
const Btnbox = styled.div`
    width: 400px;
    padding-bottom: 20px;
`

const Title = styled.div`
    font-size: 30px;
    text-align: center;
`

const NicknameCategoryWrap = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    padding-top: 20px;
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
    /* padding:20px 10px auto 10px; */
    font-size: 18px;
    padding-left: 20px;
`

const Img = styled.div`
   padding-top: 30px;
   img{
    width: 100%;
    height: 400px;
   }
`

