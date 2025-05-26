import React, { useEffect } from "react";
import axios from "axios";
import qs from "qs"; 

const KakaoCallbackPage = () => {
    useEffect(() => {
    // HashRouter를 쓰는 경우, 인가코드는 hash 안에 들어옴
    const hash = window.location.hash; 
    // const code = new URLSearchParams(hash.split("?")[1]).get("code");

    let code;

    if (window.location.search) {
        // BrowserRouter 환경 (로컬/배포 공통)
        code = new URLSearchParams(window.location.search).get("code");
        } else if (window.location.hash.includes("?")) {
        // HashRouter 환경 (GitHub Pages 등)
        code = new URLSearchParams(window.location.hash.split("?")[1]).get("code");
        }

    console.log("💡 인가코드:", code);
    const REST_API_KEY = "65295b9472b38097d11e3a81dd2b5983";

    // 배포용
    // const REDIRECT_URI = "https://seojihee4016.github.io/uslog-home";
    // 테스트용
    // const REDIRECT_URI = "http://localhost:3000/#/oauth/kakao/callback";

    const REDIRECT_URI =
    process.env.NODE_ENV === "development"
        ? "http://localhost:3000/oauth/kakao/callback" 
        : "https://seojihee4016.github.io/uslog-home/oauth/kakao/callback";

    const TOKEN_API_URL = "https://kauth.kakao.com/oauth/token";

    const getToken = async () => {
        try {
            // 1. access_token 요청
            const tokenRes = await axios.post(
                "https://kauth.kakao.com/oauth/token",
                    qs.stringify({
                        grant_type: "authorization_code",
                        client_id: REST_API_KEY,
                        redirect_uri: REDIRECT_URI,
                        code: code,
                        client_secret: "kwHBQN8u6A93vNLbD1wqIlFctRHVvpz9", // 이거 꼭 필요
                    }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                    },
                }
            );
        
            const access_token = tokenRes.data.access_token;
            console.log("액세스 토큰:", access_token);
        
            // 2. 사용자 정보 요청
            const userRes = await axios.post(
                "https://kapi.kakao.com/v2/user/me", null,
                {
                    headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                    },
                }
            );
        
            console.log("👤 사용자 정보:", userRes.data);
        
            } catch (error) {
                console.error("요청 실패:", error.response?.data || error);
            }
        };
        
    if (code) getToken();
    }, []);

    return <div>카카오 로그인 중입니다...</div>;
};

export default KakaoCallbackPage;
