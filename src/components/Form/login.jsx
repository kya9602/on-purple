import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React from "react";


const Login = () => {
    const navigate = useNavigate();

    return (
        <>
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
                    <StBtn onClick={() => navigate('/signup')}>회원가입</StBtn>
                </StBtnBox>

                <StBtnBox>
                    <StBtnKaka>카카오톡으로 로그인하기</StBtnKaka>
                </StBtnBox>

                <StBtnBox>
                    <StBtnNaver>네이버로 로그인하기</StBtnNaver>
                </StBtnBox>

            </StLoginContainer>

        </>
    )

};

export default Login;


//로그인 전체적인 큰 박스
const StLoginContainer = styled.div`
  margin: auto;
  margin-top: 10%;
  background-color: white;
  width: 30vw;
  height: auto;
  padding-bottom: 1%;
  border-radius: 20px;
  border: 3px solid #ff6f0f;
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
  font-size: 15px; 
  padding:2%;
  :hover{
    border: 2px solid #ff6f0f;
  }
`;

//작은 박스안에 "아이디 비밀번호"
const StLaber = styled.label`
  margin-top: 5px;
  color : #ff6f0f;
  font-weight: bolder;
`;

//버튼들 박스
const StBtnBox = styled.div`
  justify-content: center;
  display: flex;
  margin-top: 20px;
`;

//버튼 디자인
const StBtn = styled.button`
  background-color: white;
  border: none;
  border-radius: 5px;
  padding: 1%;
  font-weight: bold;

  :hover{
    border: none;
    background-color: #ff6f0f;
    color:white;
    font-weight: 800;
    padding: 1%;
  
}
`;

const StBtnKaka = styled.button`
  background-color: white;
  /* border: 2px solid #fcda1a; */
  border:none;
  border-radius: 5px;
  font-weight: bold;
  :hover{
    background-color:#fcda1a;
    padding: 1%;
  }
`;

const StBtnNaver = styled.button`
    
`;