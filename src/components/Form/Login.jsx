// branch mintaek test
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React from "react";
import logo from "../../assets/icons/moon.jpg";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div >
      <StHeader>
        <StHeaderTitle> 우리제목</StHeaderTitle>
        <StHeaderBody></StHeaderBody>
        <StBtnHeader onClick={() => navigate('/')}>구경 가기</StBtnHeader>
      </StHeader>
      <StLoginContainer>
        <form>
          <StUserBox>
            <StLaber style={{ marginRight: "18px" }}>아이디</StLaber>
            <StLoginInput
              type="text"
              name="nickname"
              placeholder="아이디를 입력해주세요"
            />
          </StUserBox>

          <StPwBox>
            <StLaber style={{ marginRight: "5px" }}>비밀번호</StLaber>
            <StLoginInput
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요"
            />

          </StPwBox>
          <StBtnBox>
            <StBtn>로그인</StBtn>
          </StBtnBox>
        </form>

        <StBtnBox>
          <StBtnKaka>카카오톡으로 로그인하기</StBtnKaka>
        </StBtnBox>

        <StBtnBox>
          <StBtnNaver>네이버로 로그인하기</StBtnNaver>
        </StBtnBox>

        <StSignBtn onClick={() => navigate('/signup')}>회원이 아니신가요 ?</StSignBtn>
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
    height: 45%;
    content: "";
    background: url(${logo});
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
  margin-top: 5%;
  font-size: 60px;
  font-weight: 600;
`;

//헤더 바디
const StHeaderBody = styled.div`
    
`

//헤더 메인가는 버튼
const StBtnHeader = styled.button`
  margin-top: 20px;
  margin-bottom: 3%;
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
  background-color: white;
  width: 40vw;
  height: auto;
  padding-bottom: 2%;
  border-radius: 20px;
  border: 3px solid #fdc2f0;
  /* background-color: red; */
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
`;

//작은 박스안에 "아이디 비밀번호"
const StLaber = styled.label`
  margin-top: 5px;
  color : #6d0488;
  font-weight: bolder;
  font-size: 18px;
`;

//버튼들 박스
const StBtnBox = styled.div`
  justify-content: center;
  display: flex;
  margin-top: 20px;
`;

//버튼 디자인
const StBtn = styled.button`
  margin-top: 10px;
  background-color: white;
  border: none;
  border-radius: 5px;
  padding: 1%;
  font-weight: bold;
  font-size: 17px;

  :hover{
    border: none;
    background-color: #80036f;
    color:white;
    font-weight: 800;
    padding: 1%;
  
}
`;

const StBtnKaka = styled.button`
  margin-top: 10px;
  background-color: white;
  border:none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 17px;

  :hover{
    background-color:#fcda1a;
    padding: 1%;
  }
`;

const StBtnNaver = styled.button`
  margin-top: 10px;
  margin-bottom: 20px;
  background-color: white;
  border:none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 17px;

  :hover{
    background-color:#3cad08;
    padding: 1%;
  }
`;

//회원가입 버튼
const StSignBtn = styled.button`
  border:none;
  color : #110eb9;
  background-color: transparent;
  font-size: 15px;
  font-weight: 600;
  float: right;
  margin-right: 10px;
  :hover{
    background-color: #110eb9;
    color: white;
    border-radius: 5px;
  }
`;