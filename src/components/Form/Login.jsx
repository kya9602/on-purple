// branch mintaek test
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import newlogo from "../../assets/images/perple.jpg"
import axios from "axios";
import { KAKAO_AUTH_URL } from "../Form/kakao/Auth";
import kakao from "../../assets/images/kakao.png";
import naver from "../../assets/images/naver.png";

const Login = () => {
  const navigate = useNavigate();


  const initialState = {
    username: "",
    password: ""
  }

  const [inputValue, setInputValue] = useState(initialState);


  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value })
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    //빈값 체크
    if (inputValue.username === "" || inputValue.password === "") {
      window.alert("아이디와 비밀번호를 입력해주세요.");
    }

    try {
      // console.log(payload);
      const data = await axios.post(`${process.env.REACT_APP_HOST}/user/login`, inputValue);

      localStorage.setItem("Authorization", data.headers.authorization)    //accesstoken
      localStorage.setItem("RefreshToken", data.headers.refreshtoken)   //refreshtoken 
      localStorage.setItem("nickname", data.data.data.nickname)
      console.log(data);
      if (data.data.success === false) {
        alert("data.data.error.message");
        alert("아이디와 비밀번호를 다시 확인해주세요.");
      }
      else alert("로그인이 완료되었습니다!!");
      navigate('/');


    } catch (error) {
      alert("아이디와 비밀번호를 다시 확인해주세요.");
      // return thunkAPI.rejectWithValue(error);
    }

    console.log(inputValue);

  };



  return (
    <div >
      <StHeader>
        <StHeaderTitle> On Purple </StHeaderTitle>
        <StHeaderBody>나만의 특별한 보랏빛 라이트를 켜줘</StHeaderBody>
        <StBtnHeader onClick={() => navigate('/')}>구경 가기</StBtnHeader>
      </StHeader>
      <StLoginContainer>
        <form onSubmit={onSubmitHandler}>
          <StUserBox>
            <StLaber style={{ marginRight: "15px" }}>아이디</StLaber>
            <StLoginInput
              type="text"
              name="username"
              placeholder="아이디를 입력해주세요"
              value={inputValue.username}
              onChange={onChangeHandler}
            />
          </StUserBox>

          <StPwBox>
            <StLaber style={{ marginRight: "5px" }}>비밀번호</StLaber>
            <StLoginInput
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              value={inputValue.password}
              onChange={onChangeHandler}
            />

          </StPwBox>
          <StBtnBox>
            <StBtn>로그인</StBtn>
          </StBtnBox>
        </form>

        {/* <StBtnBox>
          <StBtnKaka onClick={() => { window.location.href = KAKAO_AUTH_URL }}>
            <img src={kakao} alt="카카오로긘" />
          </StBtnKaka>
        </StBtnBox>

        <StBtnBox>
          <StBtnNaver><img src={naver} alt="네이버로그인" /></StBtnNaver>
        </StBtnBox> */}
        <StJoinBtnBox>
          <StSignBtn onClick={() => navigate('/signup')}>회원이 아니신가요 ?</StSignBtn>
        </StJoinBtnBox>
      </StLoginContainer>

    </div>
  )

};

export default Login;

//헤더박스
const StHeader = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  ::after { 
    width: 100vw;
    height: 35%;
    content: "";
    background: url(${newlogo});
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0.5;
    background-size: cover;
    /* background-repeat: no-repeat; */
}
`

//헤더 타이틀
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
`;

//헤더 바디
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

//헤더 메인가는 버튼
const StBtnHeader = styled.button`
  margin-top: 20px;
  margin-bottom: 2%;
  color: #f87288;
  font-size: 25px;
  font-weight: 600;
  border: none;
  background-color: transparent;
  :hover{
    font-size: 30px;
    font-weight: 400;
    color:whitesmoke;
    background-color: #f87288;
    border-radius: 5px;
}
`;



//로그인 전체적인 큰 박스
const StLoginContainer = styled.div`
  margin: auto;
  margin-top: 90px;
  background-color: white;
  width: 800px;
  height: auto;
  padding-bottom: 5%;
  border: 3px solid #adaaad;
  /* background-color: red; */
  @media all and (max-width: 880px) {
     width: 600px;
  }
  @media all and (max-width : 680px) {
    width: 400px;
  }
  @media all and (max-width : 480px) {
    width: 350px;
  }
`;



//로그인박스 안에 아이디 박스
const StUserBox = styled.div`
  display: flex;
  justify-content:center;
  margin-top: 2vw;
`;

//로그인박스안에 pw 박스
const StPwBox = styled.div`
  display: flex;
  justify-content:center;
  margin-top: 20px;
  margin-bottom: 30px;
  @media all and (max-width: 750px) {
    margin-bottom: 15px;
  }
  @media all and (max-width : 400px) {
    margin-bottom: 10px;
  }
`;

//인풋창 디자인
const StLoginInput = styled.input`
  border: none;
  border-radius: 5px;
  font-size: 18px; 
  padding:1%;
  :hover{
    border: 3px solid #f530f5;
  }
  @media all and (max-width: 750px) {
    font-size : 14px;
    :hover{
      border:2px solid #f530f5;
    }
  }
  @media all and (max-width : 400px) {
    font-size : 12px;
    :hover{
      border:1px solid #f530f5;
    }
  }
`;

//작은 박스안에 "아이디 비밀번호"
const StLaber = styled.label`
  margin-top: 5px;
  color : #6d0488;
  font-weight: bolder;
  font-size: 18px;
  @media all and (max-width: 750px) {
    font-size : 14px;
  }
  @media all and (max-width : 400px) {
    font-size : 12px;
  }
`;

//버튼들 박스
const StBtnBox = styled.div`
  justify-content: center;
  display: flex;
  margin-top: 20px;
  @media all and (max-width : 750px) {
    margin-top: 10px;
  }
  @media all and (max-width : 400px) {
    margin-top: 10px;
  }
`;

//로그인버튼 디자인
const StBtn = styled.button`
  margin-top: 10px;
  background-color: white;
  border: none;
  padding: 1%;
  font-weight: bold;
  font-size: 17px;
  border-bottom-style:solid; 
  border-bottom-color:#80036f;
  border-bottom-width:2px;
  :hover{
    border: none;
    background-color: #80036f;
    color:white;
    font-weight: 800;
    padding: 1%;
    border-radius: 5px;
  cursor: pointer;

}
@media all and (max-width: 750px) {
    font-size : 14px;
  }
`;

// const StBtnKaka = styled.button`
//   margin-top: 10px;
//   background-color: white;
//   border:none;
//   cursor: pointer;
//   @media all and (max-width: 750px) {
//     img{
//   width: 140px;
//       }
//   }

// `;

// const StBtnNaver = styled.button`
//   background-color: white;
//   border:none;
//   margin-bottom: 10px;
//   cursor: pointer;
//   @media all and (max-width: 750px) {
//     img{
//   width: 140px;
//       }
//   }
// `;

//회원가입 버튼 박스
const StJoinBtnBox = styled.div`
  margin-bottom  :10px ;
  margin-right: 10px;
  margin-top: 30px;
`

//회원가입 버튼
const StSignBtn = styled.button`
  border:none;
  color : #110eb9;
  background-color: transparent;
  font-size: 15px;
  font-weight: 600;
  float: right;
  :hover{
    background-color: #110eb9;
    color: white;
    border-radius: 5px;
  cursor: pointer;

  }
  @media all and (max-width: 750px) {
    font-size : 14px;
  }
`;