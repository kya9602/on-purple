import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import styled from "styled-components";
import logo from "../../assets/images/perple.jpg";

import {
    InfoBodyBox, AgeInput, MBTIInput, SecondMypageBox, SecondMyinfo, StBodyInput, StButton,
    AddMyinfo, MiniBox, MiniTitle, MiniInput, MiniHeader, StBtbBox, StSelect
} from "../Mypage/Mypagestyled";

const Form = () => {
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

        if (input.age.trim() === "" || input.mbti.trim() === "" || input.introduction.trim() === "" || input.area.trim() === "") {
            return alert("모든 칸을 채워주세요! 👀")
        };

        const { age, mbti, introduction, idealType, job, hobby, drink, pet, smoke, likeMovieType, area } = input;
        const user = {
            age: age,
            mbti: mbti,
            introduction: introduction,

            idealType: idealType,
            job: job,
            hobby: hobby,
            drink: drink,
            pet: pet,
            smoke: smoke,
            likeMovieType: likeMovieType,
            area: area,
        };
        console.log("user is ", user)


        const data = await axios.post(`http://3.37.88.29:8080/profile`, user, {
            headers: {
                Authorization: `${accessToken}`,
                RefreshToken: `${refreshToken}`,
            }
        });

        console.log(data.data);

        if (data.data.success) {
            alert('추가정보가 입력되었습니다~ ');
            navigate('/');
        }
        else {
            window.alert(data.error.message)
        }
        setInput(input);
    };



    return (
        <> <StHeader>
            <StHeaderTitle> On Purple </StHeaderTitle>
            <StHeaderBody>나만의 특별한 보랏빛 라이트를 켜줘</StHeaderBody>
        </StHeader>
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
                            <StBodyInput
                                placeholder="한줄로 나를 소개해주세요"
                                type="text"
                                name="introduction"
                                value={input.introduction}
                                onChange={onChangeHandler} />
                        </InfoBodyBox>
                    </SecondMyinfo>

                    {/* {age, mbti, introduction, 
                    idealType, job, hobby, drink. pet, smoke, likeMovieType, area} */}

                    {/* 아래 추가정보란 적는곳  */}
                    <AddMyinfo>
                        <MiniHeader>🌟내 정보를 추가한다면🌟<br />🌠상대방과 매칭 될 확률이 높아집니다.🌠</MiniHeader>
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
                        <MiniBox>
                            <MiniTitle>사는 지역 🏡</MiniTitle>
                            <MiniInput
                                placeholder="사는 곳 또는 주로 활동하는 지역을 적어주세요!"
                                type="text"
                                name="area"
                                value={input.area}
                                onChange={onChangeHandler}
                            />
                        </MiniBox>
                    </AddMyinfo>
                </form>
                <StBtbBox>
                    <StButton onClick={() => { addHandler(); console.log("input is", input) }}>작성완료 😘</StButton>
                </StBtbBox>
            </SecondMypageBox>
        </>
    );

}

export default Form;

const StHeader = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  ::after { 
    width: 100vw;
    height: 35%;
    content: "";
    background: url(${logo});
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0.5;
    background-size: cover;
    }
`

//배경 헤더 로고 타이틀
const StHeaderTitle = styled.div`
  font-size: 80px;
  font-weight: 600;
  background: #f7e9f5;
  background: -webkit-linear-gradient(left, #420255, #f7e9f5);
  background:    -moz-linear-gradient(right, #420255, #f7e9f5);
  background:      -o-linear-gradient(right, #420255, #f7e9f5);
  background:         linear-gradient(to right, #420255, #f7e9f5);
  -webkit-background-clip: text;
          background-clip: text;
  color: transparent;
  font-weight: bold;
  padding-top: 70px;
  `

//배경 헤더 로고 안내글
const StHeaderBody = styled.div`
font-size: 17px;
margin-top: 1%;
background: #09ffff;
background: -webkit-linear-gradient(left, #420255, #09ffff);
background:    -moz-linear-gradient(right, #420255, #09ffff);
background:      -o-linear-gradient(right, #420255, #09ffff);
background:         linear-gradient(to right, #420255, #09ffff);
-webkit-background-clip: text;
        background-clip: text;
color: transparent;
font-weight: bold;
`