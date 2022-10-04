import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";


const Oauth2Handler = () => {
    const navigate = useNavigate();
    // 인가코드
    let code = new URL(window.location.href).searchParams.get("code");
    console.log("code is", code)
    React.useEffect(() => {
        kakaoLogin(code)

    }, []);


    console.log("code is", code)
    const kakaoLogin = (code) => {
        // return function (dispatch, getState, { history }) {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_HOST}/user/kakaoLogin?code=${code}`,
        })
            .then((res) => {
                console.log(res); // 토큰이 넘어올 것임

                localStorage.setItem("Authorization", res.headers.authorization);    //예시로 로컬에 저장함    
                localStorage.setItem("RefreshToken", res.headers.refreshtoken);    //예시로 로컬에 저장함    
                localStorage.setItem("nickname", res.data.nickname);

                window.alert("로그인에 성공했습니다.");
                navigate('/');
            })
            .catch((err) => {
                console.log("소셜로그인 에러", err);
                window.alert("로그인에 실패하였습니다.");
                navigate("/login"); // 로그인 실패하면 로그인화면으로 돌려보냄
            })
    };





    return null;
};


export default Oauth2Handler;

const StHeader = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  ::after { 
    width: 100vw;
    height: 250px;
    content: "";
    background: url(${logo});
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0.5;
    background-size: cover;}
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

//---------------------------------------------------------


//기본 인포 바디 
const InfoBodyBox = styled.div`
  display: flex;
  flex-direction: column;
`

//큰틀
const SecondMypageBox = styled.div`
    width:500px;
    height: auto;
    padding-bottom: 2%;
    margin-top:80px;
    /* border: 3px solid #fdc2f0; */
    border-radius: 15px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
`

//작틀
const SecondMyinfo = styled.div`
/* background-color: red; */
    border-bottom-style:solid; 
    border-bottom-color:purple;
    border-bottom-width:5px;
    width: 450px;
    /* margin-left: 25vw; */
    display: flex;
    margin-left:auto;
    margin-right: auto;
    justify-content: center;
    padding-bottom: 5%;
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
