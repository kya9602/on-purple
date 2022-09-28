import axios from 'axios';
import { getCookie } from "./cookie";

export const instance = axios.create({ // axios 인스턴스를 생성합니다.
    baseURL: process.env.REACT_APP_HOST,
});

instance.interceptors.request.use(     // 요청 인터셉터 : 2개의 콜백 함수를 받습니다.
    (config) => { // instance 요청 성공 직전 호출됩니다. axios 설정값을 넣습니다. (사용자 정의 설정도 추가 가능)
        const token = getCookie("ACCESS_TOKEN");
        const refreshToken = getCookie("REFRESH_TOKEN");
        const AccessToken = localStorage.getItem("ACCESS_TOKEN");
        const RefreshToken = localStorage.getItem("REFRESHTOKEN");
        // console.log(token)
        if (AccessToken === null) {
            config.headers.Authorization = token;
            config.headers.refreshToken = refreshToken;
        } else {
            config.headers.Authorization = AccessToken;
            config.headers.refreshToken = RefreshToken;
        };
        return config;
    },
    (error) => { // 요청 에러 직전 호출됩니다.
        return Promise.reject(error);
    }
);
