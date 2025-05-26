import React, { useEffect } from "react";
import axios from "axios";

const KakaoCallbackPage = () => {
    useEffect(() => {
    // HashRouter를 쓰는 경우, 인가코드는 hash 안에 들어옴
    const hash = window.location.hash; 
    const code = new URLSearchParams(hash.split("?")[1]).get("code");
    console.log("💡 인가코드:", code);

    const REST_API_KEY = "6z9589b34782e013148d1db2d5983f";
    // 배포용
    // const REDIRECT_URI = "https://seojihee4016.github.io/uslog-home";
    // 테스트용
    // const REDIRECT_URI = "http://localhost:3000/#/oauth/kakao/callback";

    const REDIRECT_URI =
    process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://seojihee4016.github.io/uslog-home";

    const TOKEN_API_URL = "https://kauth.kakao.com/oauth/token";

    const getToken = async () => {
        try {
        const res = await axios.post(
            TOKEN_API_URL,
            new URLSearchParams({
            grant_type: "authorization_code",
            client_id: REST_API_KEY,
            redirect_uri: REDIRECT_URI,
            code: code,
            }),
            {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            }
        );
        console.log("🟡 액세스 토큰:", res.data.access_token);
        } catch (error) {
            console.error("토큰 요청 실패:", error);
        }
    };

    if (code) getToken();
    }, []);

    return <div>카카오 로그인 중입니다...</div>;
};

export default KakaoCallbackPage;
