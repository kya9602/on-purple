const REST_API_KEY = "fadf8f1b03d0c19f86c5e5dd119aecb8";
const REDIRECT_URI = "http://localhost:3000/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
