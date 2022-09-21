import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import React from "react";

const Information = () => {
    const navigate = useNavigate();
    return (
        <InformationContainerDiv>
            
            <InformationDiv>
                <ProfileDetailImg 
                src="https://post-phinf.pstatic.net/MjAyMDAzMDFfMTIx/MDAxNTgzMDQ5ODEzODc5.eLwaHPGkxYlj-RGPp5zE7Ghs__H9tYjvXaxdZehOo_cg.yopbH7--a4HJPuHxo_6-gx-gojvo0V0dqSgaem-d1mwg.JPEG/%EC%95%88%EC%9C%A0%EC%A7%842.JPG?type=w1200"
                ></ProfileDetailImg>
                <h3>닉네임</h3>
            </InformationDiv>
            <InformationButtonSet>
                <h2>대화 기록 삭제</h2>
                <h2>연결 해제</h2>
                <h2
                onClick={()=>{navigate('/report');}}
                >신고하기</h2>
            </InformationButtonSet>
        </InformationContainerDiv>
    )
}

export default Information;

const InformationContainerDiv = styled.div`
    display: flex; 
    flex-wrap: wrap;
    flex-direction: column; /*수직 정렬*/
    justify-content: center;
    align-items:center;
`

const InformationDiv = styled.div`
    flex:1;
    margin-top: 100px;
    height: 100vh;
    min-height: 20vh;
`

const ProfileDetailImg = styled.img`
    width: 180px;
    height: 180px; 
    border-radius: 70%;
`
const InformationButtonSet = styled.div`
    flex:1;
    max-width: 100%;
    margin-top: 100px;
    justify-content: center;
    align-items:center;
`