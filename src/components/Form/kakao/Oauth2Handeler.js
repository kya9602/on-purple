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

                window.alert("로그인에 성공했습니다. ");
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

