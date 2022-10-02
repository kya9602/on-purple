import styled from "styled-components";

//마이페이지 큰박스
export const MypageBox = styled.div`
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
export const Myinfo = styled.div`
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
export const Profile = styled.img`
    width: 10vw;
    height: 10vw; 
    border-radius: 70%;
    overflow: hidden;
    margin: 1vw;
    justify-content: start;
`

//내정보 박스 
export const InfoBody = styled.div`
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 1vw;
`

//나이 박스
export const Age = styled.div`
    text-align: center;
    padding: 3%;
    font-size: 20px;
`

//MBTI 박스
export const MBTI = styled.div`
    text-align: center;
    padding: 3%;
    font-size:20px;
    
`

//한줄평 박스
export const OneLine = styled.div` 
    text-align: center;
    padding: 3%;
    font-size:20px;
    width: 20vw;
`

//수정버튼
export const ModifyBtn = styled.button`
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
export const ListBox = styled.div`
  display: flex;
  margin-top: 2vw;
  height: auto;
`

//리스트 박스 타이틀
export const Listtitle = styled.div`
    display: flex;
    width: 40vw;
    justify-content: center;
    margin-bottom: 1.5vw;
    font-size: 20px;
    font-weight: 600;
    margin-left: 3vw;
`

//나를 좋아요한 사람 목록박스
export const LovemeBox = styled.div`
  width: 70%;
  margin: 0px auto;

  display: grid;
  /* align-items: center; */
  justify-content: center;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 5%;
  grid-row-gap: 5%;
  
  @media screen and (max-width: 900px){
    /* width: 80%; */
    grid-template-columns: repeat(1, 1fr);
    grid-row-gap: 3%;
  }
  @media screen and (max-width: 600px){
    grid-template-columns: repeat(1, 1fr);
    grid-row-gap: 1%;
  } 
`


//좋아요한 사람 프로필 사진 
export const LoveCard = styled.img`
    margin: auto;
    margin-left: 2vw;
    background-color: #8adafd;
    border-radius: 10px;
    padding : 1%;
    width: 13vw;
    height:13vw;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
`

//매칭된 사람 목록 박스
export const MatchingBox = styled.div`
  width: 70%;
  margin: 0px auto;

  display: grid;
  /* align-items: center; */
  justify-content: center;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 5%;
  grid-row-gap: 5%;
  
  @media screen and (max-width: 900px){
    /* width: 80%; */
    grid-template-columns: repeat(1, 1fr);
    grid-row-gap: 40px;
  }
  @media screen and (max-width: 600px){
    grid-template-columns: repeat(1, 1fr);
    grid-row-gap: 50px;
  } 
`

//매칭된 사람 프로필 사진
export const MatchingCard = styled.img`
    margin: auto;
    margin-left: 2vw;
    background-color: #8adafd;
    border-radius: 10px;
    padding : 1%;
    width: 13vw;
    height:13vw;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
`





//----------------------수정스타일링------------------------------


//수정 인풋창
export const StBodyInput = styled.textarea`
  margin-top: 1%;
  border: 2px solid #f797f7;
  /* border-radius: 5px; */
  font-size: 12px; 
  padding:1%;
  width: 180px;
  height: 60px;
  word-break: keep-all;
  :hover{
    border: 2px solid #f797f7;
  }
  &:focus {
      outline: none;
      border: 2px solid gray;
    }
 /* @media all and (max-width : 750px) {
    font-size: 14px; 
    width : 40vw;
    height: 10vw;
  } */
`
//완료버튼창 박스
export const StBtbBox = styled.div`
  height: 50px;
  margin-top: 15px;
  display: flex;
  justify-content:center;
  width : 200px;
`

//수정 완료버튼창
export const StButton = styled.button`
  height: 40px;
  width: 150px;
  font-size: 20px;
  border: 2px solid purple;
  font-weight: 600;
  background-color: white;
  :hover{
    color : #f56589;
    background-color: #ffffae;
    border : none;
  }
  
  @media all and (max-width : 750px) {
  font-size: 12px; 
  width : 100px;
  height: 30px;
  font-weight: 600;
  }
`

//수정큰틀
export const SecondMypageBox = styled.div`
    width:300px;
    height: auto;
    padding-bottom: 2%;
    margin-top: 15px;
    border: 3px solid #fdc2f0;
    border-radius: 15px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
`

//수정 마이페이지틀
export const SecondMyinfo = styled.div`
  /* border-bottom-style:solid; 
    border-bottom-color:gray;
    border-bottom-width:2px; */
    width: 300px;
    /* margin-left: 25vw; */
    display: flex;
    justify-content: center;
    /* padding-bottom: 2%; */
`


//수정 사진틀
export const ImgBox = styled.div`
  display  : flex ;
  justify-content: center;
  margin-top: 2vw;
`;

//이미지 input
export const Avatar = styled.img`
   border: 5px solid #f8b2f8;
    border-radius: 100px;
    width: 10vw;
    height: 10vw;
    background-size: cover;
`

//마이페이지 추가 정보란 제일큰박스
export const AddMyinfo = styled.div`
  width: 100vw;
  height: auto;
`

//마이페이지 추가 정보란 낱개박스
export const MiniBox = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  @media all and (max-width:750px) {
    height: 30px;
  }
`
//마이페이지 낱개 박스 타이틀
export const MiniTitle = styled.div`
  margin-top: 1.3%;
  width: 13vw;
  height: 1.5em;
  text-align: center;
  background-color: #bebaba;
  border-radius: 5px;
  font-size: 18px;
  @media all and (max-width : 750px) {
    font-size: 14px; 
    width : 24vw;
    height: 1.5em;
  }
`

//마이페이지 낱개 박스 인풋
export const MiniInput = styled.input`
  margin: 1%;
  text-align: center;
  width: 40vw;
  margin-left: 2vw;
  height: 1.5em;
  border-radius: 5px;
  border: 2px solid gray;
  font-size: 18px;
  @media all and (max-width : 750px) {
    font-size: 12px; 
    width : 60vw;
    height: 1.5em;
  }
`

//마이페이지 추가정보란 헤더
export const MiniHeader = styled.div`
  /* border : 2px solid gray; */
  border-radius: 5px;
  padding: 1%;
  text-align: center;
  font-size: 30px;
  font-weight: bolder;
  color: purple;
  width: 100vw;
  margin-top: 10px;
  /* margin-bottom: 10px; */
  @media all and (max-width : 800px) {
    font-size: 16px; 
    width : 100vw;
    height: 30px;
    margin-bottom: 15px;
  }
`
//기본 인포 바디 
export const InfoBodyBox = styled.div`
display: flex;
flex-direction: column;
`
//나이 인풋창
export const AgeInput = styled.input`
  margin  : auto ;
  margin-top: 10px;
  height: 35px;
  width: 180px;
  font-size: 12px;
  word-break: keep-all;
  border: none;
  border-bottom:2px solid #f797f7;
  &:focus {
      outline: none;
      border-bottom: 2px solid gray;
    }
    text-align: center;
`

//엠비티아이 드롭다운옵션
export const MBTIInput = styled.option`
  display: flex;
  
`
//엠비티아이 옵션 헤드
export const StSelect = styled.select`
  color: #797979;
  width: 180px;
  height: 30px;
  border: none;
  border-bottom:2px solid #f797f7;
  padding-left: 5px;
  display: flex;
  margin  : auto ;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  font-size: 12px;
  &:focus {
      outline: none;
      border-bottom: 2px solid gray;
    }
    /* @media all and (max-width : 750px) {
    font-size: 12px; 
    width : 200px;
    height: 30px;
  } */
`