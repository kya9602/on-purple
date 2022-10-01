import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
// import List from "../../pages/List";

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
            url: `http://3.37.88.29:8080/user/kakaoLogin?code=${code}`,
        })
            .then((res) => {
                console.log(res); // 토큰이 넘어올 것임

                // const ACCESS_TOKEN = res.headers.Authorization;
                // console.log(ACCESS_TOKEN)
                localStorage.setItem("Authorization", res.headers.authorization);    //예시로 로컬에 저장함    
                localStorage.setItem("RefreshToken", res.headers.refreshtoken);    //예시로 로컬에 저장함    
                localStorage.setItem("nickname", res.data.nickname);

                navigate("/") // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
                window.alert("로그인에 성공했습니다.");
            })
            .catch((err) => {
                console.log("소셜로그인 에러", err);
                window.alert("로그인에 실패하였습니다.");
                navigate("/login"); // 로그인 실패하면 로그인화면으로 돌려보냄
            })
        // }
    };



    return null
};


export default Oauth2Handler;