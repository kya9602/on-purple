import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import styled from "styled-components";
import logo from "../../assets/images/perple.jpg";

const SignUpPlus = () => {
    const navigate = useNavigate();

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

    // axios
    const addHandler = async () => {


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




        const data = await axios.post(`${process.env.REACT_APP_HOST}/profile/`, user, {
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
            {/* <StHeader>
            <StHeaderTitle> On Purple </StHeaderTitle>
            <StHeaderBody>나만의 특별한 보랏빛 라이트를 켜줘</StHeaderBody>
        </StHeader> */}
            <SecondMypageBox>
                <form>


                    {/* {age, mbti, introduction, 
                    idealType, job, hobby, drink. pet, smoke, likeMovieType, area} */}

                    {/* 아래 추가정보란 적는곳  */}
                    <AddMyinfo>
                        <MiniHeader>🌟 필수 입력란은 아닙니다 🌠</MiniHeader>
                        <MiniBox>
                            <MiniTitle>이상형 🎈</MiniTitle>
                            <MiniInput
                                placeholder="이상형을 적어주세요"
                                type="text"
                                name="idealType"
                                value={input.idealType}
                                onChange={onChangeHandler}
                            />
                        </MiniBox>
                        <MiniBox>
                            <MiniTitle>직업 👄</MiniTitle>
                            <MiniInput
                                placeholder="직업 또는 업종을 적어주세요"
                                type="text"
                                name="job"
                                value={input.job}
                                onChange={onChangeHandler}
                            />
                        </MiniBox>
                        <MiniBox>
                            <MiniTitle>취미 👓</MiniTitle>
                            <MiniInput
                                placeholder="좋아하는, 함께 했으면 좋겠는 취미를 적어주세요"
                                type="text"
                                name="hobby"
                                value={input.hobby}
                                onChange={onChangeHandler}
                            />
                        </MiniBox>
                        <MiniBox>
                            <MiniTitle>반려동물 유무 🐶</MiniTitle>
                            <MiniInput
                                placeholder="사랑하는 반려동물이 있다면 자랑해주세요!"
                                type="text"
                                name="pet"
                                value={input.pet}
                                onChange={onChangeHandler}
                            />
                        </MiniBox>
                        <MiniBox>
                            <MiniTitle>흡연 유무 🚬</MiniTitle>
                            <MiniInput
                                placeholder="Yes or No 본인 또는 원하는 상대방의 흡연유무"
                                type="text"
                                name="smoke"
                                value={input.smoke}
                                onChange={onChangeHandler}
                            />
                        </MiniBox>
                        <MiniBox>
                            <MiniTitle>음주습관 🍻</MiniTitle>
                            <MiniInput
                                placeholder="술을 즐기는 편인지 적어주세요"
                                type="text"
                                name="drink"
                                value={input.drink}
                                onChange={onChangeHandler}
                            />
                        </MiniBox>
                        <MiniBox>
                            <MiniTitle>좋아하는 영화 🎬</MiniTitle>
                            <MiniInput
                                placeholder="좋아하는 영화종류를 적어주세요."
                                type="text"
                                name="likeMovieType"
                                value={input.likeMovieType}
                                onChange={onChangeHandler}
                            />
                        </MiniBox>

                    </AddMyinfo>
                </form>
                <StBtbBox>
                    <StButton onClick={() => { addHandler(); console.log("input is", input) }}> 추가 필수정보도 작성완료 😘 👆</StButton>
                </StBtbBox>
            </SecondMypageBox>
        </>
    );

}

export default SignUpPlus;

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
    border-radius: 15px;
    background-color: white;
    display: flex;
    flex-direction: column;
 `

//완료버튼창 박스
const StBtbBox = styled.div`
                        height: 50px;
                        margin-top: 15px;
                        display: flex;
                        justify-content:center;
                        width : 400px;
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


//마이페이지 추가 정보란 제일큰박스
const AddMyinfo = styled.div`
  width: 400px;
  height: auto;
`

//마이페이지 추가 정보란 낱개박스
const MiniBox = styled.div`
  height: 30px;
  display: flex;
  justify-content: center;
  /* @media all and (max-width:750px) {
    height: 30px;
  } */
`
//마이페이지 낱개 박스 타이틀
const MiniTitle = styled.div`
  margin-top: 1.3%;
  width: 130px;
  height: 1.5em;
  text-align: center;
  background-color: #bebaba;
  border-radius: 5px;
  font-size: 14px;
  /* @media all and (max-width : 750px) {
    font-size: 14px; 
    width : 24vw;
    height: 1.5em;
  } */
`

//마이페이지 낱개 박스 인풋
const MiniInput = styled.input`
  margin: 1%;
  text-align: center;
  width: 300px;
  margin-left: 2vw;
  height: 1.5em;
  border-radius: 5px;
  border: 2px solid gray;
  font-size: 14px;
  /* @media all and (max-width : 750px) {
    font-size: 12px; 
    width : 60vw;
    height: 1.5em;
  } */
`

//마이페이지 추가정보란 헤더
const MiniHeader = styled.div`
  /* border : 2px solid gray; */
  border-radius: 5px;
  padding: 1%;
  text-align: center;
  font-size: 18px;
  margin-bottom: 10px;
    font-weight: bolder;
  color: purple;
  width: 400px;
  margin-top: 10px;
  /* margin-bottom: 10px; */
  /* @media all and (max-width : 800px) {
    font-size: 16px; 
    width : 100vw;
    height: 30px;
    margin-bottom: 15px;
  } */
`