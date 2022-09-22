import React, { } from "react";
import styled from "styled-components";
import profile from "../../assets/images/profile.jpg"

const Mypage = () => {

    return (
        <>
            <MypageBox>
                {/* 내정보 박스 Myinfo */}
                <Myinfo>
                    <Profile src={profile} />
                    <InfoBody>
                        <Age> age : 27</Age>
                        <MBTI>MBTI : ENFP</MBTI>
                        <OneLine>한줄평으로 나를 소개하세요</OneLine>
                    </InfoBody>
                    <ModifyBtn>수정하기</ModifyBtn>
                </Myinfo>
                {/* 매칭 된사람 및 나를 좋아요한사람 목록박스 두개 필요 */}
                <ListBox>
                    {/* 나를 좋아요한 목록 박스 */}
                    <LovemeBox>
                        <Lovetitle>내가 받은 Perple</Lovetitle>

                        <LoveCard src={profile}></LoveCard>
                        <LoveCard src={profile}></LoveCard>
                        <LoveCard src={profile}></LoveCard>
                        <LoveCard src={profile}></LoveCard>

                    </LovemeBox>
                    {/* 나와 매칭된 사람 목록 박스 */}
                    <MatchingBox>
                        <MatchingTitle>나랑 마음이 통한 사람</MatchingTitle>

                        <MatchingCard src={profile}></MatchingCard>
                        <MatchingCard src={profile}></MatchingCard>
                        <MatchingCard src={profile}></MatchingCard>
                        <MatchingCard src={profile}></MatchingCard>

                    </MatchingBox>
                </ListBox>


            </MypageBox>
        </>
    );
}

export default Mypage;

//---------------------------------------------------------------------------------------------------
//마이페이지 큰박스
const MypageBox = styled.div`
    width: 98vw;
    height: auto;
    padding-bottom: 2%;
    margin: auto;
    margin-top: 5%;
    border: 5px solid #fdc2f0;
    border-radius: 15px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    
`

//마이페이지 내정보박스 
const Myinfo = styled.div`
    border-bottom-style:solid; 
    border-bottom-color:gray;
    border-bottom-width:2px;
    width: 94vw;
    /* margin-left: 25vw; */
    margin-top: 1vw;
    display: flex;
    justify-content: center;
    padding-bottom: 2%;
`

//마이페이지 프로필 사진
const Profile = styled.img`
    width: 10vw;
    height: 10vw; 
    border-radius: 70%;
    overflow: hidden;
    margin: 1vw;
    justify-content: start;
`

//내정보 박스 
const InfoBody = styled.div`
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 1vw;
`

//나이 박스
const Age = styled.div`
    text-align: center;
    padding: 3%;
    font-size: 20px;
`

//MBTI 박스
const MBTI = styled.div`
    text-align: center;
    padding: 3%;
    font-size:20px;
    
`

//한줄평 박스
const OneLine = styled.div` 
    text-align: center;
    padding: 3%;
    font-size:20px;
    width: 20vw;
`

//수정버튼
const ModifyBtn = styled.button`
    height: 2vw;
    margin-top: 10vw;
    margin-left: 1vw;
    background-color: white;
    border: 2px solid #d87dd8;
    :hover{
        background-color: #d87dd8;
        border: 2px solid #d87dd8;
    }
`

//리스트 전체 박스
const ListBox = styled.div`
  display: flex;
  margin-top: 2vw;
`

//나를 좋아요한 사람 목록박스
const LovemeBox = styled.div`
  background-color: red;
  width: 40vw;
  height: 40vw;
  margin-right: 2vw;
`

//좋아요 박스 타이틀
const Lovetitle = styled.div`
    
`

//좋아요한 사람 프로필 사진 
const LoveCard = styled.img`
  width: 15vw;
  height: 15vw;
`

//매칭된 사람 목록 박스
const MatchingBox = styled.div`
  background-color: blue;
  width: 40vw;
  height: 40vw;
  margin-left: 2vw;

`

//매칭 박스 타이틀
const MatchingTitle = styled.div`
    
`

//매칭된 사람 프로필 사진
const MatchingCard = styled.img`
  width: 15vw;
  height: 15vw;
`