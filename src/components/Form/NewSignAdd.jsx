import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/images/perple.jpg";
import jwt_decode from "jwt-decode";


const SignUpAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    age: "",
    mbti: "",
    introduction: "",

    idealType: "",
    job: "",
    hobby: "",
    drink: "",
    pet: "",
    smoke: "",
    likeMovieType: "",
    area: "",
  });

  // {age, mbti, introduction, idealType, job, hobby, drink. pet, smoke, likeMovieType, area},  {RefreshToken, Authorization}




  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value, });
  };
  console.log(input)


  const accessToken = localStorage.getItem("Authorization"); //accesstoken 
  const refreshToken = localStorage.getItem("RefreshToken") //refreshToken

  // const { profile } = useSelector((state) => state.post);
  // const { postId } = useParams();

  // useEffect(() => {
  //     dispatch(__getPostsDetail(postId));
  // }, [dispatch])

  // axios
  const addHandler = async () => {

    if (input.age.trim() === "" || input.mbti.trim() === "" || input.introduction.trim() === "" || input.area.trim() === "") {
      return alert("모든 칸을 채워주세요! 👀")
    };

    const { age, mbti, introduction, idealType, job, hobby, drink, pet, smoke, likeMovieType, area } = input;
    const user = {
      age: age,
      mbti: mbti,
      introduction: introduction,
      area: area,

      idealType: idealType,
      job: job,
      hobby: hobby,
      drink: drink,
      pet: pet,
      smoke: smoke,
      likeMovieType: likeMovieType,
    };
    console.log("user is ", user)

    var token = localStorage.getItem("Authorization");
    var decoded = jwt_decode(token);
    console.log(decoded)
    const userId = decoded.userId;


    const data = await axios.post(`${process.env.REACT_APP_HOST}/profile/${userId}`, user, {
      headers: {
        Authorization: `${accessToken}`,
        RefreshToken: `${refreshToken}`,
      }
    });

    console.log(data.data);

    if (data.data.success) {
      alert('마지막 step으로 넘어가주세요~~!');
      // navigate('/');
    }
    else {
      window.alert(data.error.message)
    }
    setInput(input);
  };



  return (
    <>
      <SecondMypageBox>
        <form>
          <SecondMyinfo>
            <InfoBodyBox>
              <AgeInput
                placeholder="당신의 나이는 몇살인가요 ??"
                type="text"
                name="age"
                value={input.age}
                className="text"
                onChange={onChangeHandler}
              />
              <StSelect
                name='mbti'
                type="text"
                defaultValue="default"
                onChange={onChangeHandler}
                required>
                <MBTIInput value="default" disabled> MBTI를 골라주세요</MBTIInput>
                <option value="ISTJ">I S T J</option>
                <option value="ISTP">I S T P</option>
                <option value="ISFJ">I S F J</option>
                <option value="ISFP">I S F P</option>
                <option value="INFJ">I N F J</option>
                <option value="INFP">I N F P</option>
                <option value="INTJ">I N T J</option>
                <option value="INTP">I N T P</option>
                <option value="ESTP">E S T P</option>
                <option value="ESTJ">E S T J</option>
                <option value="ESFP">E S F P</option>
                <option value="ESFJ">E S F J</option>
                <option value="ENFP">E N F P</option>
                <option value="ENFJ">E N F J</option>
                <option value="ENTP">E N T P</option>
                <option value="ENTJ">E N T J</option>

              </StSelect>

              <Location
                placeholder="당신이 사는 지역은 어디인가요 ??"
                type="text"
                name="area"
                value={input.area}
                className="text"
                onChange={onChangeHandler}
              />

              <StBodyInput
                placeholder="한줄로 10자 이상 나를 소개해주세요~"
                type="text"
                name="introduction"
                minLength={10}
                value={input.introduction}
                onChange={onChangeHandler} />
            </InfoBodyBox>
          </SecondMyinfo>
        </form>
        <StBtbBox>
          <StButton onClick={() => { addHandler(); console.log("input is", input) }}> 추가 필수정보도 작성완료 😘 👆</StButton>
        </StBtbBox>
      </SecondMypageBox>
    </>
  );

}

export default SignUpAdd;

//기본 인포 바디 
const InfoBodyBox = styled.div`
  display: flex;
  flex-direction: column;
`

//큰틀
const SecondMypageBox = styled.div`
    width:300px;
    height: auto;
    padding-bottom: 2%;
    margin-top: 15px;
    /* border: 3px solid #fdc2f0; */
    border-radius: 15px;
    background-color: white;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
`

//작틀
const SecondMyinfo = styled.div`
  /* border-bottom-style:solid; 
    border-bottom-color:gray;
    border-bottom-width:2px; */
    width: 300px;
    /* margin-left: 25vw; */
    display: flex;
    margin-left: 10px;
    /* justify-content: center; */
    /* padding-bottom: 2%; */
`



//나이 인풋창
const AgeInput = styled.input`
  margin  : auto ;
  margin-top: 10px;
  height: 35px;
  width: 300px;
  font-size: 14px;
  word-break: keep-all;
  border: none;
  border-bottom:2px solid #80036f;
  &:focus {
      outline: none;
      border-bottom: 2px solid #80036f;
    }
    text-align: center;
`

//엠비티아이 드롭다운옵션
const MBTIInput = styled.option`
  display: flex;
  
`
//엠비티아이 옵션 헤드
const StSelect = styled.select`
  color: #797979;
  width:300px;
  height: 30px;
  border: none;
  border-bottom:2px solid #80036f;
  padding-left: 5px;
  display: flex;
  margin  : auto ;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  font-size: 14px;
  &:focus {
      outline: none;
      border-bottom: 2px solid #80036f;
    }
    /* @media all and (max-width : 750px) {
    font-size: 12px; 
    width : 200px;
    height: 30px;
  } */
`


//지역인풋값
const Location = styled.input`
  margin  : auto ;
  margin-bottom: 20px;
  height: 35px;
  width: 300px;
  font-size: 14px;
  word-break: keep-all;
  border: none;
  border-bottom:2px solid #80036f;

  /* @media all and (max-width : 750px) {
  font-size: 14px; 
  width : 40vw;
  height: 10vw;
  } */
  &:focus {
      outline: none;
      border-bottom: 2px solid #80036f;
    }
    text-align: center;

    /* @media all and (max-width : 750px) {
    font-size: 12px; 
    width : 150px;
    height: 30px;
  } */
`


//한줄소개 인풋창
const StBodyInput = styled.textarea`
  margin-top: 1%;
  border: 2px solid #80036f;
  /* border-radius: 5px; */
  font-size: 14px; 
  padding:1%;
  width: 300px;
  height: 80px;
  word-break: keep-all;
  :hover{
    border: 2px solid #f797f7;
  }
  &:focus {
      outline: none;
      border: 2px solid #80036f;
    }
 /* @media all and (max-width : 750px) {
    font-size: 14px; 
    width : 40vw;
    height: 10vw;
  } */
`

//완료버튼창 박스
const StBtbBox = styled.div`
  height: 50px;
  margin-top: 15px;
  display: flex;
  justify-content:center;
  width : 300px;
  margin-left: 10px;
`

//수정 완료버튼창
const StButton = styled.button`
cursor: pointer;
  height: 40px;
  width: 300px;
  font-size: 16px;
  border: 2px solid purple;
  font-weight: 600;
  background-color: white;
  :hover{
    color : #f56589;
    background-color: #ffffae;
    border : none;
  }
  
 
`