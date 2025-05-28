import React, { useEffect } from "react";
import axios from "axios";
import qs from "qs";

const KakaoCallbackPage = () => {
    
    useEffect(() => {
        let code;

        // HashRouter를 쓰는 경우, 인가코드는 hash 안에 들어옴
        // const hash = window.location.hash;

        if (window.location.search) {
            // BrowserRouter 환경 (로컬/배포 공통)
            code = new URLSearchParams(window.location.search).get("code");
        } else if (window.location.hash.includes("?")) {
            // HashRouter 환경 (GitHub Pages 등)
            code = new URLSearchParams(window.location.hash.split("?")[1]).get("code");
        }

        console.log("💡 인가코드:", code);

        const REST_API_KEY = "65295b9472b38097d11e3a81dd2b5983";
        const REDIRECT_URI =
        process.env.NODE_ENV === "development"
            ? "http://localhost:3000/oauth/kakao/callback"
            : "https://uslog-home.netlify.app/oauth/kakao/callback";
            
        const getToken = async (code) => {
        try {
            // 1. 액세스 토큰 요청
            const tokenRes = await axios.post(
                "https://kauth.kakao.com/oauth/token",
                qs.stringify({
                    grant_type: "authorization_code",
                    client_id: REST_API_KEY,
                    redirect_uri: REDIRECT_URI,
                    code: code,
                    client_secret: "kwHBQN8u6A93vNLbD1wqIlFctRHVvpz9",
                }),
                {
                    headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                    },
                }
            );

            const access_token = tokenRes.data.access_token;
            console.log("🔑 액세스 토큰:", access_token);

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

            const kakaoId = userRes.data.id;
            console.log("사용자 정보:", userRes.data);

            // 3. 사용자 ID를 백엔드로 전송
            const backendRes = await axios.post("/test", { kakaoId });
            console.log("백엔드로 사용자 ID 전송 성공");
            console.log("백엔드 응답:", backendRes.data);

            // 사용자에게 메시지 알림
            alert(backendRes.data.message);

        } catch (error) {
            console.error("요청 실패:", error.response?.data || error);
            alert("로그인 중 오류가 발생했습니다.");
        }
        };

        if (code) getToken(code);
    }, []);

    return <div>카카오 로그인 중입니다...</div>;
};

export default KakaoCallbackPage;
